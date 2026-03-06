import type { Request, Response, NextFunction } from "express";
import express from "express";
import topUpPaymentControllers from "../controllers/payment/topupPayment.controller.js";
import cehckingUserSessions from "../middlewares/checkingUserSessions.js";
import transfersControllers from "../controllers/payment/transfers.controller.js";
import { verifikasiTransfersControllers } from "../controllers/payment/verifikasiTransfersToClient.controller.js";
import { tarikBalanceController } from "../controllers/payment/tarikBalance.controller.js";
import { limiter } from "../utils/limiter.js";

const router = express.Router();

router.get(
  "/check/payment",
  (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .json({ status: true, message: "payment API healt true" });
  },
);

// router.post("/payment/topup", cehckingUserSessions, topUpPaymentControllers);

// router.post("/payment/transfers", cehckingUserSessions, transfersControllers);

// router.post("/payment/client", clientTransfersControllers);

router.post("/payment/topup", cehckingUserSessions, topUpPaymentControllers);

router.post("/payment/transfers", transfersControllers);

router.post("/payment/client", verifikasiTransfersControllers);

router.post(
  "/payment/get_balance",
  limiter,
  cehckingUserSessions,
  tarikBalanceController,
);

export default router;
