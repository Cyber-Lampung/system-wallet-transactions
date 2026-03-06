import type { tranfersResponse } from "../../types/paymentResponse.types.js";
import {
  getWalletIdWhereUserIdModel,
  balanceCheckModel,
  decreaseBalanceModel,
  getPrivateRsaKeyModel,
} from "../../models/repo/balancePayment.repo.js";
import { exportPublickKeySignature } from "../../utils/exportPublicKey.js";
import { db } from "../../config/db.config.js";
import { HttpError } from "../../utils/HttpError.js";
import { generateKey } from "crypto";
import fs from "fs";
import creatingRsaKey from "../../utils/creatingRsaPrivateKey.js";

export async function tranfersService(
  user_id: string,
  role: string,
  to_wallet_id: string,
  balance_send: bigint,
  accessToken: string,
): Promise<tranfersResponse | object | undefined> {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    if (!user_id || !to_wallet_id || !balance_send) {
      return { status: false, message: "invalid input, values is not empety" };
    }

    if (typeof balance_send !== "number") {
      return { status: false, message: "input balace harus bersifat number" };
    }

    const kirimBalance = async (
      from_wallet_id: string,
      to_wallet_id: string,
      balance_send: bigint,
      RsaPublickKey: string | unknown,
      signature: string | unknown,
    ) => {
      // fetching data ke endpoint client
      const res = await fetch("http://localhost:3000/api/payment/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify({
          from_wallet_id,
          to_wallet_id,
          balance_send,
          signature,
          RsaPublickKey,
        }),
      });

      const data = await res.json();

      return data;
    };

    const getWalletId = await getWalletIdWhereUserIdModel(user_id);

    const wallet_id: string[] | undefined = [];

    getWalletId.map((values) => {
      wallet_id.push(values.wallet_id);
    });

    if (getWalletId?.length === 0) {
      return { status: false, message: "wallet user tidak ditemukan" };
    }

    const balanceCheck = await balanceCheckModel(user_id, balance_send);

    const isBalance = balanceCheck[0]?.balance > balance_send;

    if (!isBalance) {
      return {
        status: false,
        message: "invalid transfers balance tidak cukup",
      };
    }

    try {
      const decreaseBalance = await decreaseBalanceModel(
        connection,
        user_id,
        balance_send,
      );

      if (decreaseBalance.affectedRows === 0) {
        return { status: false, message: "invalid transfers" };
      }

      // const privateKeyId = await creatingRsaKey();

      // console.log(privateKeyId);

      // const getPrivateRsakey = await getPrivateRsaKeyModel(user_id);

      const path = "../data/pvKey.pem";

      const pvKey = await fs.readFileSync(
        "/dev/wallet/src/data/pvKey.pem",
        "utf-8",
      );

      // heck balance apakah yang ditransder cukup atau tidak

      // const privateKey = getPrivateRsakey[0]?.RsaPrivateKey;

      const payload = {
        to_wallet_id: to_wallet_id,
        balance_send: balance_send,
      };

      const returnRsa = await exportPublickKeySignature(pvKey, payload);

      if (
        typeof returnRsa === "object" &&
        "publicKey" in returnRsa &&
        "signature" in returnRsa
      ) {
        const responseSend = await kirimBalance(
          wallet_id[0] as string,
          to_wallet_id,
          balance_send,
          returnRsa?.publicKey,
          returnRsa?.signature,
        );

        if (typeof responseSend === "object") {
          if (responseSend?.status) {
            await connection.commit();
            return {
              status: true,
              message: "berhasil transfers",
              total_transfers: balance_send,
            };
          } else {
            return { status: false, message: "invalid transfers" };
          }
        } else {
          return { status: false, message: "bad request" };
        }
      }
    } catch (error: any) {
      console.log(error);
    }

    // if (response?.status === true) {
    //   return { status: true, message: response?.message };
    // }

    // balanceCheck.map((balance) => {
    //   const validasiBalance = balance.balance > balance_send;

    //   if (!validasiBalance) {
    //     return { status: false, message: "invalid transfers, saldo tidak cukup" };
    //   }

    //   if (validasiBalance) {
    //     // send public key ke penerima

    //     (async () => {
    //       try {
    //         const publicKey = await exportPublickKey(privateKey);

    //         const response = await kirimBalance(
    //           wallet_id[0] as string,
    //           to_wallet_id,
    //           balance_send,
    //           publicKey,
    //         );

    //         if (response?.status === true) {
    //           return { status: true, message: response?.message };
    //         }
    //       } catch (error: any) {
    //         console.log(error);
    //       }
    //     })();
    //   } else {
    //     return false;
    //   }

    //   // if (validasiBalance[0 === false) {
    //   //   return {
    //   //     status: false,
    //   //     message: "invalid transfers balance tidak cukup",
    //   //   };
    //   // }
    // });
  } catch (error) {
    new HttpError(400, "error, invalid transfers client");
    await connection.rollback();
  } finally {
    await connection.release();
  }
}
