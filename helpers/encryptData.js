import crypto from "crypto";
import "dotenv/config";
const { secret_key, secret_iv, encryptionMethod, hashMethod } = process.env;

const key = crypto
  .createHash(hashMethod)
  .update(secret_key, "utf-8")
  .digest("hex")
  .substr(0, 32);

const iv = crypto
  .createHash(hashMethod)
  .update(secret_iv, "utf-8")
  .digest("hex")
  .substr(0, 16);

const encryptData = (plain_text) => {
  const encryptor = crypto.createCipheriv(encryptionMethod, key, iv);
  const aes_encrypted =
    encryptor.update(plain_text, "utf8", "base64") + encryptor.final("base64");
  return Buffer.from(aes_encrypted).toString("base64");
};

export default encryptData;
