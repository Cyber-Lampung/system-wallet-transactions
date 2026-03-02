import crypt from "crypto";

export async function creatingWalletAddress(user_id: string): Promise<string> {
  const randomWalletAddress = await crypt.hash("sha256", user_id);

  return randomWalletAddress;
}
