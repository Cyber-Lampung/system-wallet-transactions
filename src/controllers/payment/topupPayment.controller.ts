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
    const user_id =
      req.user_id || ("ad510c33-9bba-401b-ae75-77f1d059e150" as string);
    const role = req.role as string;

    const { type_payment, to_wallet, topup_balance } = req.body as Balance;

    const resService = await topUpPaymentService(
      user_id,
      type_payment,
      to_wallet,
      role,
      topup_balance,
    );

    if (resService?.status) {
      return res
        .status(201)
        .json({ status: resService?.status, message: resService?.message });
    } else {
      return res
        .status(400)
        .json({ status: resService?.status, message: resService?.message });
    }

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
