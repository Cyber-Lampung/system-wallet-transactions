export interface User {
  user_id: string;
  email: string;
  username: string;
  password: string;
}

export interface Balance {
  topup_balance: bigint | number;
}
