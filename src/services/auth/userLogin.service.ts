import type { userLoginResponseService } from "../../types/custom.types.js";
import hashPassword from "../../utils/hashingPassword.js";
import { getUserLoginModel } from "../../models/repo/getUserLogin.repo.js";
import { creatingSessions } from "../../utils/createSessions.js";

export default async function userLoginService(
  email: string,
  password: string,
): Promise<userLoginResponseService> {
  // validation
  if (!email || !password) {
    return { status: false, message: "" };
  }

  // hash password
  const passwordHash = await hashPassword(password);

  const getUser = await getUserLoginModel(email, passwordHash);

  // creating sessions
  const accessToken = await creatingSessions(
    getUser[0]?.user_id,
    getUser[0]?.role,
  );

  const refreshToken = getUser[0]?.user_id;

  if (getUser.length > 0) {
    return {
      status: true,
      message: "user found, login berhasil",
      data: { accessToken, refreshToken },
    };
  } else {
    return { status: false, message: "error user tidak ditemukan" };
  }

  // return { status: false, message: "error user tidak ditemukan" };
}
