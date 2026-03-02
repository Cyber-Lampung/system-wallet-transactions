import nodeRsa from "node-rsa";

export default async function creatingRsaKey(): Promise<object> {
  // setup key
  const key = new nodeRsa({ b: 1024 });

  const privateKey = key.exportKey("private");
  const publicKey = key.exportKey("public");

  return { privateKey, publicKey };
}
