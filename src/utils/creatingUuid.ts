import { v4 as uuidV4 } from "uuid";

export default async function craetingUUID(): Promise<string> {
  return uuidV4();
}
