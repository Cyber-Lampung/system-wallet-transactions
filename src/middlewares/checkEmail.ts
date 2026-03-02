import { Request, Response, NextFunction } from "express";
import { User } from "../types/user.types";

export default async function checkMailUsed(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Object> {
  try {
    /**
     * Extracts the email from the request body.
     * @param req - The Express request object containing the email in the body
     * @returns An object with the email property of type string
     */
    const { email } = req.body as User;

    next();
  } catch (error: unknown) {
    res
      .status((error as any).status || 500)
      .json({ message: (error as any).message });
  }

  return { status: true };
}
