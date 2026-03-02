import jwt from "jsonwebtoken";

export async function creatingSessions(
  user_id: string,
  role: string,
): Promise<string | boolean> {
  const SECRET: string | undefined = process.env.SECRET;

  if (!SECRET) {
    return false;
  }

  const payload: object = {
    user_id: user_id,
    role: role,
  };

  const accessToken = await jwt.sign(payload, SECRET, {
    algorithm: "HS256",
    expiresIn: "15M",
  });

  return accessToken;
}
