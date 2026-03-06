import NodeRSA from "node-rsa";
import { updateBalanceModel } from "../../models/repo/payment.repo.js";

export async function verifikasiTransfersService(
  user_id: string,
  from_wallet_id: string,
  to_wallet_id: string,
  balance_send: bigint,
  RsaPublickKey: string,
  signature: string,
) {
  const key = new NodeRSA(RsaPublickKey);

  const payload = JSON.stringify({
    to_wallet_id: to_wallet_id,
    balance_send: balance_send,
  });

  // console.log(signature);

  const verif = key.verify(
    payload,
    signature as string,
    "utf8" as string,
    "base64",
  );

  if (!verif) {
    return {
      status: false,
      message: "error transfers invalid, silahkan coba lagi",
    };
  }

  // update balance di database
  const updateBalance = await updateBalanceModel(user_id, balance_send);
}
