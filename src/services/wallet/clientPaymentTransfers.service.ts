import {
  getInfomasionWalletModel,
  updateBalanceClientModel,
} from "../../models/repo/payment.repo.js";

export async function clientPaymentTransfers(
  from_wallet_id: string,
  to_wallet_id: string,
  balance_send: bigint,
  RsaPublickKey: string,
): Promise<object | string | undefined> {
  if (!from_wallet_id || !to_wallet_id || balance_send < 0 || !RsaPublickKey) {
    return { status: false, message: "invalid, fields is not empety" };
  }

  // query
  const [checkWalletId] = await Promise.all([
    getInfomasionWalletModel(to_wallet_id),
  ]);

  console.log(checkWalletId);

  if (checkWalletId.length === 0 || checkWalletId.length < 0) {
    return { status: false, message: "user tidak ditemukan" };
  }

  // jika ditemukan maka lanjut ke update balance

  const updateBalanceClient = await updateBalanceClientModel(
    to_wallet_id,
    balance_send,
  );

  if (!updateBalanceClient) {
    return { status: false };
  }

  if (updateBalanceClient.affectedRows > 0) {
    return { status: true, message: "berhasil transfer saldo ke client" };
  }
}
