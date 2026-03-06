import {
  type Request,
  type Response,
  type NextFunction,
  response,
} from "express";
import { tranfersService } from "../../services/tranfers/tranfers.service.js";
import type { BalanceTransfersType } from "../../types/paymentResponse.types.js";

export default async function transfersControllers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // get user_id and role

  try {
    const user_id =
      (req.user_id as string) || "uad510c33-9bba-401b-ae75-77f1d059e1511";
    const role = req.role as string;
    const accessToken = req.cookies.accessToken;

    const { to_wallet_id, balance_send }: BalanceTransfersType = req.body;

    const response = await tranfersService(
      user_id,
      role,
      to_wallet_id,
      balance_send,
      accessToken,
    );

    if (typeof response === "object" && "status" in response) {
      if (response.status) {
        return res.status(200).json({ response });
      } else {
        return res
          .status(400)
          .json({ status: false, message: response.message });
      }
    }
  } catch (error: any) {
    res.status((error.status as number) || 500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
    return {
      status: false,
      message: error.message || "Internal Server Error",
    };
  }
}
