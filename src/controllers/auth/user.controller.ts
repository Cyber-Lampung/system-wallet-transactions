import type { Request, Response, NextFunction } from "express";
import type { User } from "../../types/user.types.js";
import userRegisterService from "../../services/auth/userRegister.service.js";
import userLoginService from "../../services/auth/userLogin.service.js";

export async function userRegisterControllers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, username, password, publicKey } = req.body as User;

    const resService = await userRegisterService(
      email,
      username,
      password,
      publicKey,
    );

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
            maxAge: 5 * 60 * 1000, // 15 menit
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

export async function userLoginControllers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;

  const resService = await userLoginService(email, password);

  if (
    typeof resService === "object" &&
    "status" in resService &&
    "message" in resService &&
    "data" in resService
  ) {
    // res cookie
    if (
      typeof resService.data === "object" &&
      "accessToken" in resService.data &&
      "refreshToken" in resService.data
    ) {
      res.cookie("accessToken", resService.data?.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "dev" ? false : true,
        path: "/",
        maxAge: 15 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", resService.data?.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "dev" ? false : true,
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    if (resService.status) {
      return res
        .status(200)
        .json({ status: resService.status, message: resService.message });
    } else {
      return res
        .status(404)
        .json({ status: resService.status, message: resService.message });
    }
  }
}
