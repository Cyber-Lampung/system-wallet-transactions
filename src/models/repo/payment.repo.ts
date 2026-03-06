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
  type_payment: string,
  user_id: string,
  riwayat_topup: bigint | number,
): Promise<ResultSetHeader> {
  const [result] = await db.execute<ResultSetHeader>(
    "insert into RiwayatTopUp (riwayat_id, wallet_id, type_payment, user_id, riwayat_topup, topup_time) values (?, ?, ?, ?, ?, NOW())",
    [riwayat_id, wallet_id, type_payment, user_id, riwayat_topup],
  );

  return result;
}
