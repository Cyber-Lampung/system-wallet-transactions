import type { RowDataPacket } from "mysql2";
import { db } from "../../config/db.config.js";

export async function balanceCheckModel(
  user_id: string,
): Promise<RowDataPacket[]> {
  const [result] = await db.execute<RowDataPacket[]>(
    "select balance from WalletAccount where user_id = ?",
    [user_id],
  );

  return result;
}

export async function getPrivateRsaKeyModel(
  user_id: string,
): Promise<RowDataPacket[]> {
  const [result] = await db.execute<RowDataPacket[]>(
    "select RsaPrivateKey from RsaPrivateKey where user_id = ?",
    [user_id],
  );

  return result;
}

export async function getWalletIdWhereUserIdModel(
  user_id: string,
): Promise<RowDataPacket[]> {
  const [result] = await db.execute<RowDataPacket[]>(
    "select wallet_id from WalletAccount where user_id = ?",
    [user_id],
  );

  return result;
}
