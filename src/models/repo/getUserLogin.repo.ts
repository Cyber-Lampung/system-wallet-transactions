import { db } from "../../config/db.config.js";
import type { OkPacketParams, ResultSetHeader, RowDataPacket } from "mysql2";

export async function getUserLoginModel(
  email: string,
  password: string,
): Promise<RowDataPacket[]> {
  const [result] = await db.execute<RowDataPacket[]>(
    "select U.email, U.password, U.user_id, U.role, S.refreshToken from Users U inner join Sessions S on U.user_id = S.user_id where email = ? and U.password = ?",
    [email, "$2b$10$uw/nX46gBrHrsKgtPUuJce/fvQJSlP4UjhhOUHqYfdqG9e/hBrQ42"],
  );

  // console.log(result);

  return result;
}
