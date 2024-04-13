import { encryptData, decryptData } from "../../helpers/hashing.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
const encryptions = asyncHandler(async (req, res) => {
  const bodyData = req.body;

  Object.keys(bodyData).forEach((key) => {
    bodyData[key] = encryptData(bodyData[key]);
  });

  res.status(200).json({
    status: true,
    data: bodyData,
    message: "Encrypted data",
  });
});

const decryptions = asyncHandler(async (req, res) => {
  const bodyData = req.body;

  Object.keys(bodyData).forEach((key) => {
    bodyData[key] = decryptData(bodyData[key]);
  });

  res.status(200).json({
    status: true,
    data: bodyData,
    message: "decrypted data",
  });
});
export { encryptions, decryptions };
