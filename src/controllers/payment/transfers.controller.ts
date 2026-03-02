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
    const user_id = req.user_id as string;
    const role = req.role as string;
    const accessToken = req.cookies.accessToken;

    const { to_wallet_id, balance_send }: BalanceTransfersType = req.body;

    const resService = await tranfersService(
      user_id,
      role,
      to_wallet_id,
      balance_send,
      accessToken,
    );

    if (typeof resService === "object" && "status" in resService) {
      if (resService.status) {
        return res
          .status(200)
          .json({ response: { status: true, message: resService.message } });
      } else {
        return res
          .status(400)
          .json({ status: false, message: resService.message });
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
