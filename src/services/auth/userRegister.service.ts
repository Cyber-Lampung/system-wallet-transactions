import type { RegisterResponseService } from "../../types/custom.types.js";
import { HttpError } from "../../utils/HttpError.js";
import { RegexpInput } from "../../utils/regexpInput.js";
import hashPassword from "../../utils/hashingPassword.js";
import craetingUUID from "../../utils/creatingUuid.js";
import { protectionsSql } from "../../middlewares/protectionSql.js";
import {
  saveRefreshTokenModel,
  userRegisterModel,
} from "../../models/repo/userRegister.repo.js";
import { creatingSessions } from "../../utils/createSessions.js";
import creatingWalletAddressService from "../wallet/creatingWalletAddress.service.js";
import { saveWalletAddressModel } from "../../models/repo/walletAddress.repo.js";
import creatingRsaKey from "../../utils/creatingRsaPrivateKey.js";
import { saveRsaKeyModel } from "../../models/repo/saveRsaKey.repo.js";

export default async function userRegisterService(
  email: string,
  username: string,
  password: string,
): Promise<RegisterResponseService> {
  if (!email || !username || !password) {
    throw new HttpError(400, "invalid, values is not values");
  }

  const protectedResult = await protectionsSql(email, username, password);

  if (protectedResult) {
    throw new HttpError(403, "values is character not allowed");
  }

  if (password.length < 8) {
    throw new HttpError(400, "password is weak");
  }

  // // validasi regexp
  // const validasi = RegexpInput(email);
  // hash password
  console.time("hashPassword");
  const passwordHash: string = await hashPassword(password);
  console.timeEnd("hashPassword");
  const user_id: string = await craetingUUID();
  const role: string = "users";
  const balance: number = 0;
  const refreshToken: string = await craetingUUID();
  const RsaPrivateKey_id: string = await craetingUUID();

  // creating wallet address
  const walletId = await creatingWalletAddressService(user_id);

  if (!walletId) {
    return { status: false, message: "wallet id is not created" };
  }

  console.time("userRegisterModel");
  const [creatingAccount, saveWalletAddress] = await Promise.all([
    await userRegisterModel(user_id, email, username, passwordHash, role),
    await saveRefreshTokenModel(user_id, refreshToken),
    await saveWalletAddressModel(walletId, user_id, balance),
  ]);
  console.timeEnd("userRegisterModel");

  console.time("creatingSessions");
  const accessToken = await creatingSessions(user_id, role);
  console.timeEnd("creatingSessions");

  if (creatingAccount.affectedRows > 0 && saveWalletAddress.affectedRows > 0) {
    // RSA key

    const rsaKey = await creatingRsaKey();

    if (typeof rsaKey === "object" && "privateKey" in rsaKey) {
      const RsaPrivateKey: string = rsaKey.privateKey as string;

      if (!RsaPrivateKey) {
        return { status: false, message: "invalid rsa private key" };
      }

      const saveRsaKey = await saveRsaKeyModel(
        RsaPrivateKey_id,
        user_id,
        RsaPrivateKey,
      );

      // console.log(saveRsaKey);
    }

    return {
      status: true,
      message: "success registerasi accounts and creating wallet address",
      data: { accessToken, refreshToken },
    };
  } else {
    return {
      status: false,
      message: "invalid registerasi accounts",
    };
  }
}
