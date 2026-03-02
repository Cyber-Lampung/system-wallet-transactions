import type { NextFunction, Request, Response } from "express";
import type { Balance } from "../../types/user.types.js";
import type { BalanceResponse } from "../../types/custom.types.js";
import topUpPaymentService from "../../services/wallet/paymentTopUp.service.js";

// declare global {
//   namespace Express {
//     interface Request {
//       user_id?: string;

//     }
//   }
// }

export default async function topUpPaymentControllers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user_id = req.user_id as string;
    const role = req.role as string;

    const { topup_balance } = req.body as Balance;

    const resService = await topUpPaymentService(user_id, role, topup_balance);

    if (!resService) {
      return { status: false, message: "" };
    }

    res.status(201).json({ status: true, message: resService.message });

    // return { status: true, message: resService.message };
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
