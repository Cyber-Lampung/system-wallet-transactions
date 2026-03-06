export interface paymentResponse {
  status: boolean;
  message: string;
}

export interface tranfersResponse {
  status: boolean;
  message: string;
  total_transfers: bigint;
}

export interface BalanceTransfersType {
  from_wallet_id: string;
  to_wallet_id: string;
  balance_send: bigint;
}
