import type { ResultSetHeader } from "mysql2/promise";
import { db } from "../../config/db.config.js";

export async function saveWalletAddressModel(
  walletId: string | boolean,
  user_id: string,
  balance: number,
): Promise<ResultSetHeader> {
  const [rows] = await db.execute<ResultSetHeader>(
    "insert into WalletAccount (wallet_id, user_id, balance, created) values (?, ?, ?, NOW())",
    [walletId, user_id, balance],
  );

  return rows;
}
