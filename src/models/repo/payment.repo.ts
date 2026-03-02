import type { RowDataPacket, ResultSetHeader, OkPacketParams } from "mysql2";
import { db } from "../../config/db.config.js";

export async function searchUserIdModel(
  user_id: string,
): Promise<RowDataPacket[]> {
  const [result] = await db.execute<RowDataPacket[]>(
    "select W.user_id, W.wallet_id from WalletAccount W join Users U on W.user_id = U.user_id where U.user_id = ? ",
    [user_id],
  );

  return result;
}

export async function updateBalanceModel(
  user_id: string,
  topup_balance: bigint | number,
): Promise<ResultSetHeader> {
  const [result] = await db.execute<ResultSetHeader>(
    "update WalletAccount set balance = balance + ? where user_id = ?",
    [topup_balance, user_id],
  );

  return result;
}

export async function saveRiwayatTopUpModel(
  riwayat_id: string,
  wallet_id: string,
  user_id: string,
  riwayat_topup: bigint | number,
): Promise<ResultSetHeader> {
  const [result] = await db.execute<ResultSetHeader>(
    "insert into RiwayatTopUp (riwayat_id, wallet_id, user_id, riwayat_topup, topup_time) values (?, ?, ?, ?, NOW())",
    [riwayat_id, wallet_id, user_id, riwayat_topup],
  );

  return result;
}

export async function getInfomasionWalletModel(
  to_wallet_id: string,
): Promise<RowDataPacket[]> {
  const [result] = await db.execute<RowDataPacket[]>(
    "select U.user_id, U.username, W.wallet_id, W.balance from Users as U inner join WalletAccount as W on U.user_id = W.user_id where wallet_id = ?",
    [to_wallet_id],
  );

  return result;
}

export async function updateBalanceClientModel(
  to_wallet_id: string,
  balance_send: bigint,
): Promise<ResultSetHeader> {
  const [result] = await db.execute<ResultSetHeader>(
    "update WalletAccount set balance = balance + ? where wallet_id = ?",
    [balance_send, to_wallet_id],
  );

  return result;
}
