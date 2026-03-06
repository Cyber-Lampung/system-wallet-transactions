import type {
  RowDataPacket,
  ResultSetHeader,
  PoolConnection,
} from "mysql2/promise";
import { db } from "../../config/db.config.js";

export async function balanceCheckModel(
  user_id: string,
  balance_send: bigint,
): Promise<RowDataPacket[]> {
  const [result] = await db.execute<RowDataPacket[]>(
    "select balance from WalletAccount where user_id = ? and balance > ?",
    [user_id, balance_send],
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

export async function decreaseBalanceModel(
  connection: PoolConnection,
  user_id: string,
  balance_send: bigint,
): Promise<ResultSetHeader> {
  const [result] = await connection.query<ResultSetHeader>(
    "update WalletAccount set balance = balance - ? where user_id = ? and balance >= ?",
    [balance_send, user_id, balance_send],
  );

  return result;
}

export async function name() {}
