import type { ResultSetHeader } from "mysql2";
import { db } from "../../config/db.config.js";

export async function saveRsaKeyModel(
  RsaPrivateKeyId: string,
  user_id: string,
  RsaPrivateKey: string,
): Promise<ResultSetHeader> {
  const [result] = await db.execute<ResultSetHeader>(
    "insert into RsaPrivateKey (RsaPrivateKey_id, user_id, RsaPrivateKey, created) values (?, ?, ?, NOW())",
    [RsaPrivateKeyId, user_id, RsaPrivateKey],
  );

  return result;
}
