import NodeRSA from "node-rsa";

export async function exportPublickKeySignature(
  privateKey: string,
  payload: object,
): Promise<object> {
  // get public key dari private key
  const key = new NodeRSA(privateKey);

  const data = JSON.stringify(payload);

  const publicKey: string = await key.exportKey("public");
  const signature: string = key.sign(Buffer.from(data, "utf-8"), "base64");

  return { publicKey, signature };
}
