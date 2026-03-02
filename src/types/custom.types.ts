import type { NextFunction } from "express";

export interface RegisterResponseService {
  status: boolean;
  message: string;
  data?: object;
}

export interface CustomsResponse {
  status: number;
  valid: boolean;
  message: string;
}

export interface BalanceResponse {
  status: boolean;
  message: string;
}

export interface ParamsMethod {
  req: Request;
  res: Response;
  next: NextFunction;
}

export interface DbConnection {
  host: string;
  user: string;
  pass: string;
}
