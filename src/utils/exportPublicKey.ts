import NodeRSA from "node-rsa";

export async function exportPublickKey(privateKey: string): Promise<string> {
  // get public key dari private key
  const key = new NodeRSA(privateKey);

  const publicKey: string = await key.exportKey("public");

  return publicKey;
}
