import {
  saveRiwayatTopUpModel,
  searchUserIdModel,
  updateBalanceModel,
} from "../../models/repo/payment.repo.js";
import type { paymentResponse } from "../../types/paymentResponse.types.js";
import craetingUUID from "../../utils/creatingUuid.js";

export default async function topUpPaymentService(
  user_id: string,
  role: string,
  topup_balance: number | bigint,
): Promise<paymentResponse | undefined> {
  // if (!role || role !== "users" || "admin") {
  //   return { status: false, message: "role tidak ditemukan" };
  // }

  if (!user_id) {
    return { status: false, message: "invalid, user_id is not found" };
  }

  if (!topup_balance || topup_balance === 0) {
    return { status: false, message: "not balance transfer" };
  }

  // creating riwayat top up
  const riwayat_topup: string = await craetingUUID();
  let wallet_id: string = "";

  // query ke sql
  const [searchUser, updateBalance] = await Promise.all([
    searchUserIdModel(user_id),
    updateBalanceModel(user_id, topup_balance),
  ]);

  if (typeof searchUser === "object") {
    if (!searchUser) {
      return { status: false, message: "user_id is not found" };
    }
  }

  if (typeof updateBalance === "object") {
    searchUser.map(async (wallet) => {
      const saveRiwayatTopUp = await saveRiwayatTopUpModel(
        riwayat_topup,
        wallet.wallet_id,
        user_id,
        topup_balance,
      );
    });

    if (updateBalance.affectedRows > 0) {
      return {
        status: true,
        message: "succes update saldo anda silahkan check saldo.",
      };
    } else {
      return {
        status: false,
        message: "invalid update saldo anda.",
      };
    }
  }
}
