import type { Request, Response, NextFunction } from "express";
import { clientPaymentTransfers } from "../../services/wallet/clientPaymentTransfers.service.js";
import { HttpError } from "../../utils/HttpError.js";

export async function clientTransfersControllers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { from_wallet_id, to_wallet_id, balance_send, RsaPublickKey } =
      req.body;

    const resService = await clientPaymentTransfers(
      from_wallet_id,
      to_wallet_id,
      balance_send,
      RsaPublickKey,
    );

    if (typeof resService === "object" && "message" in resService) {
      return res
        .status(200)
        .json({ status: true, message: resService.message });
    }
  } catch (error: any) {
    throw new HttpError(400, "invalid transfers to wallet client");
  }
}
