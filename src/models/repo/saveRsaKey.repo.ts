import type { ResultSetHeader } from "mysql2";
import { db } from "../../config/db.config.js";

export async function saveRsaKeyModel(
  RsaPublicKeyId: string,
  user_id: string,
  publicKey: string,
): Promise<ResultSetHeader> {
  const [result] = await db.execute<ResultSetHeader>(
    "insert into RsaPrivateKey (RsaPrivateKey_id, user_id, RsaPrivateKey, created) values (?, ?, ?, NOW())",
    [RsaPublicKeyId, user_id, publicKey],
  );

  return result;
}
