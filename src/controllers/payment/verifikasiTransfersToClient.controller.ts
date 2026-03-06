import type { Request, Response, NextFunction } from "express";
import { verifikasiTransfersService } from "../../services/wallet/clientPaymentTransfers.service.js";
import { HttpError } from "../../utils/HttpError.js";

export async function verifikasiTransfersControllers(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<object | boolean | undefined> {
  const {
    from_wallet_id,
    to_wallet_id,
    balance_send,
    RsaPublickKey,
    signature,
  } = req.body;

  const user_id = req.user_id || "ad510c33-9bba-401b-ae75-77f1d059e150";

  try {
    const response = await verifikasiTransfersService(
      user_id,
      from_wallet_id,
      to_wallet_id,
      balance_send,
      RsaPublickKey,
      signature,
    );

    return res.status(200).json({ status: true, message: "berhasil" });
  } catch (error: any) {
    new HttpError(error.statusCode || 500, "Internal server error");
  }
}
