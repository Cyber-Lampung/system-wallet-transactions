import type {
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

export async function searchWalletUserModel(
  connection: PoolConnection,
  user_id: string,
): Promise<RowDataPacket[]> {
  //   console.log(connection);

  const [result] = await connection.execute<RowDataPacket[]>(
    "select wallet_id from WalletAccount where user_id = ?",
    [user_id],
  );

  return result;
}

export async function checkBalancehUserModel(
  connection: PoolConnection,
  user_id: string,
  total_penarikan: bigint,
): Promise<RowDataPacket[]> {
  const [result] = await connection.execute<RowDataPacket[]>(
    "select balance from WalletAccount where user_id = ?",
    [user_id],
  );

  return result;
}

export async function kurangiBalanceModel(
  connection: PoolConnection,
  total_penarikan: bigint,
  user_id: string,
): Promise<ResultSetHeader> {
  const [result] = await connection.execute<ResultSetHeader>(
    "update WalletAccount set balance = balance - ? where user_id = ? and balance > ?",
    [total_penarikan, user_id, total_penarikan],
  );

  return result;
}

export async function checkToTransfersModel(
  connection: PoolConnection,
  payment_type: string,
): Promise<RowDataPacket[]> {
  const [result] = await connection.execute<RowDataPacket[]>(
    "select jenis_payment from paymentTarik where jenis_payment = ? and jenis_payment = ?",
    [payment_type, payment_type],
  );

  return result;
}
