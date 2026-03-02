import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user_id?: string;
      role?: string;
    }
  }
}

export default async function cehckingUserSessions(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<string | object | undefined> {
  try {
    const accessToken: string = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ status: false, message: "invalid accessToken is not found" });
    }

    const SECRET = process.env.SECRET as string;

    if (!SECRET) {
      return { status: 404, valid: false, message: "invalid" };
    }

    // validasi jwt
    const validasiJwt = await jwt.verify(accessToken, SECRET);

    if (typeof validasiJwt === "object") {
      req.user_id = validasiJwt.user_id;
      req.role = validasiJwt.role;
      next();
    }
  } catch (error: any) {
    return { status: 401, valid: true, error: error };
  }
}
