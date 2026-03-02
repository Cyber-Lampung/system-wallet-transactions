export interface paymentResponse {
  status: boolean;
  message: string;
}

export interface tranfersResponse {
  status: boolean;
  message: string;
}

export interface BalanceTransfersType {
  from_wallet_id: string;
  to_wallet_id: string;
  balance_send: bigint;
}
