import type { ResultSetHeader } from "mysql2";
import { db } from "../../config/db.config.js";

export async function userRegisterModel(
  user_id: string,
  email: string,
  username: string,
  password: string,
  role: string,
): Promise<ResultSetHeader> {
  //   const query = ;

  const [result] = await db.execute<ResultSetHeader>(
    `insert into Users (user_id, email, username, password, role, created) values (?, ?, ?, ?, ?, NOW())`,
    [user_id, email, username, password, role],
  );

  return result;
}

export async function saveRefreshTokenModel(
  user_id: string,
  refreshToken: string,
): Promise<ResultSetHeader> {
  const [result] = await db.execute<ResultSetHeader>(
    "insert into Sessions (user_id, refreshToken, created, expires) values (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))",
    [user_id, refreshToken],
  );

  return result;
}
