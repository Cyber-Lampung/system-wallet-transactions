import type { Request, Response, NextFunction } from "express";
import responseService from "../../services/wallet/tarikBalance.service.js";

export async function tarikBalanceController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user_id: string = req.user_id as string;
  const role: string | undefined = req.role;

  const { payment_type, total_penarikan } = req.body;

  const response = await responseService(
    user_id,
    role,
    payment_type,
    total_penarikan,
  );

  if (
    typeof response === "object" &&
    "status" in response &&
    "message" in response
  ) {
    if (response.status) {
      return res
        .status(200)
        .json({ status: response?.status, message: response?.message });
    } else {
      return res
        .status(400)
        .json({ status: response?.status, message: response?.message });
    }
  }
}
