import { db } from "../../config/db.config.js";
import { HttpError } from "../../utils/HttpError.js";
import {
  searchWalletUserModel,
  checkBalancehUserModel,
  kurangiBalanceModel,
  checkToTransfersModel,
} from "../../models/repo/tarikBalance.repo.js";

export default async function responseService(
  user_id: string | undefined,
  role: string | undefined,
  payment_type: string,
  total_penarikan: bigint,
): Promise<object | undefined> {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    if (typeof user_id === "undefined") {
      return {
        status: false,
        message: "invalid silahkan login atau register terlebih dahulu",
      };
    }

    // validasi jika salah satu kosong
    if (!user_id || !role) {
      return {
        status: false,
        mesasge: "invalid silahkan login terlebih dahulu",
      };
    }

    if (!payment_type) {
      return {
        status: false,
        message: "invalid, payment type tidak boleh diedit / not value",
      };
    }

    const [searchWalletUser, checkBalance, checkToTransfers, kurangiBalance] =
      await Promise.all([
        searchWalletUserModel(connection, user_id),
        checkBalancehUserModel(connection, user_id, total_penarikan),
        checkToTransfersModel(connection, payment_type),
        kurangiBalanceModel(connection, total_penarikan, user_id),
      ]);

    if (searchWalletUser.length === 0) {
      return { status: false, message: "inalid Account tidak ditemukan" };
    }

    if (checkToTransfers.length === 0) {
      return {
        status: false,
        message: "invalid bank penarikan tidak ditemukan",
      };
    }

    if (checkBalance.length === 0) {
      return {
        status: false,
        message:
          "invalid balance tidak cukup, silahkan masukan nominal dibawah saldo",
      };
    }

    if (kurangiBalance.affectedRows > 0) {
      return { status: true, message: "succes tarik balace ke wallet anda" };
    } else {
      return {
        status: false,
        message: "saldo anda kurang dari jumlah penarikan",
      };
    }
  } catch (error: any) {
    new HttpError(error.statusCode || 500, "Internal Server Error");
    await connection.rollback();
  } finally {
    await connection.release();
  }
}
