export interface User {
  user_id: string;
  email: string;
  username: string;
  password: string;
  publicKey: string;
}

export interface Balance {
  type_payment: string;
  to_wallet: string;
  topup_balance: bigint | number;
}
