import { creatingWalletAddress } from "../../utils/creatingWalletAddress.js";

export default async function creatingWalletAddressService(
  user_id: string,
): Promise<string | boolean> {
  const randomWalletId = creatingWalletAddress(user_id);

  if (!randomWalletId) {
    return false;
  }

  return randomWalletId;
}
