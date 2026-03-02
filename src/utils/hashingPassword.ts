import bcrypt, { hash } from "bcrypt";

export default async function hashPassword(password: string): Promise<string> {
  const hashPassword = await bcrypt.hash(password, 10);

  return hashPassword;
}
