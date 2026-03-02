import type { Request, Response, NextFunction } from "express";
import type { User } from "../../types/user.types.js";
import userRegisterService from "../../services/auth/userRegister.service.js";

export default async function userRegisterControllers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, username, password } = req.body as User;

    const resService = await userRegisterService(email, username, password);

    if (typeof resService === "object") {
      if (
        typeof resService.data === "object" &&
        "accessToken" in resService.data &&
        "refreshToken" in resService.data
      ) {
        res.cookie(
          "accessToken",
          (resService.data as { accessToken: string }).accessToken,
          {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000, // 15 menit
            sameSite: "strict",
          },
        );

        res.cookie(
          "refreshToken",
          (resService.data as { refreshToken: string }).refreshToken,
          {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict",
          },
        );
      }

      return res.status(201).json({
        response: { status: resService.status, message: resService.message },
      });
    }
  } catch (error: any) {
    return res.status(error.status || 500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
}
