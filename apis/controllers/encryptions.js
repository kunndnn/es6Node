import { encryptData, decryptData } from "#helpers/hashing";
import { promiseHandler } from "#helpers/promiseHandler";
import { ApiResponse } from "#helpers/response";
const encryptions = promiseHandler(async (req, res) => {
  const bodyData = req.body;

  Object.keys(bodyData).forEach((key) => {
    bodyData[key] = encryptData(bodyData[key]);
  });

  res.status(200).json(new ApiResponse(200, "Encrypted data", bodyData));
});

const decryptions = promiseHandler(async (req, res) => {
  const bodyData = req.body;

  Object.keys(bodyData).forEach((key) => {
    bodyData[key] = decryptData(bodyData[key]);
  });

  res.status(200).json(new ApiResponse(200, "decrypted data", bodyData));
});
export { encryptions, decryptions };
