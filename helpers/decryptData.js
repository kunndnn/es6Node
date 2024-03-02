import crypto from "crypto";
import "dotenv/config";
const { secret_key, secret_iv, encryptionMethod, hashMethod } = process.env;

const secret = crypto
  .createHash(hashMethod)
  .update(secret_key, "utf-8")
  .digest("hex")
  .substr(0, 32);

const iv = crypto
  .createHash(hashMethod)
  .update(secret_iv, "utf-8")
  .digest("hex")
  .substr(0, 16);

const decryptData = (encrypted_text) => {
  const buff = Buffer.from(encrypted_text, "base64");
  encrypted_text = buff.toString("utf-8");
  const decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return (
    decryptor.update(encrypted_text, "base64", "utf8") + decryptor.final("utf8")
  );
};

export default decryptData;
