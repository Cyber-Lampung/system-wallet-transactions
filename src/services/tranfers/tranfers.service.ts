import type { tranfersResponse } from "../../types/paymentResponse.types.js";
import {
  getWalletIdWhereUserIdModel,
  balanceCheckModel,
  getPrivateRsaKeyModel,
} from "../../models/repo/balancePayment.repo.js";
import { exportPublickKey } from "../../utils/exportPublicKey.js";

export async function tranfersService(
  user_id: string,
  role: string,
  to_wallet_id: string,
  balance_send: bigint,
  accessToken: string,
): Promise<tranfersResponse | object> {
  const kirimBalance = async (
    from_wallet_id: string,
    to_wallet_id: string,
    balance_send: bigint,
    RsaPublickKey: string,
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
        RsaPublickKey,
      }),
    });

    const data = await res.json();

    return data;
  };

  if (!user_id || !to_wallet_id || !balance_send) {
    return { status: false, message: "invalid input, values is not empety" };
  }

  // heck balance apakah yang ditransder cukup atau tidak

  const [getWalletId, balanceCheck, getPrivateRsakey] = await Promise.all([
    getWalletIdWhereUserIdModel(user_id),
    balanceCheckModel(user_id),
    getPrivateRsaKeyModel(user_id),
  ]);

  if (getWalletId.length === 0 || !getWalletId) {
    return { status: false };
  }

  const wallet_id: string[] | undefined = [];

  getWalletId.map((values) => {
    wallet_id.push(values.wallet_id);
  });

  const validasiBalance = balanceCheck.map((balance) => {
    const validasiBalance = balance.balance > balance_send;

    if (validasiBalance) {
      // send public key ke penerima

      getPrivateRsakey.forEach(async (key) => {
        if (typeof key === "object" && "RsaPrivateKey" in key) {
          try {
            const publicKey = await exportPublickKey(
              key.RsaPrivateKey as string,
            );

            const response = await kirimBalance(
              wallet_id[0] as string,
              to_wallet_id,
              balance_send,
              publicKey,
            );

            console.log(response);
          } catch (error: any) {
            console.log(error);
          }
        }
      });
    } else {
      return false;
    }
  });

  if (validasiBalance[0] === false) {
    return { status: false, message: "invalid transfers balance tidak cukup" };
  }

  return { status: true, message: "berhasil tranfers ke akun pengguna" };
}
