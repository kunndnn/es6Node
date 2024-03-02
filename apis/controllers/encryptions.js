import encryptData from "../../helpers/encryptData.js";
import decryptData from "../../helpers/decryptData.js";
const encryptions = async (req, res) => {
  try {
    const bodyData = req.body;

    Object.keys(bodyData).forEach((key) => {
      bodyData[key] = encryptData(bodyData[key]);
    });

    return res.status(200).json({
      status: true,
      data: bodyData,
      message: "Encrypted data",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

const decryptions = async (req, res) => {
  try {
    const bodyData = req.body;

    Object.keys(bodyData).forEach((key) => {
      bodyData[key] = decryptData(bodyData[key]);
    });

    return res.status(200).json({
      status: true,
      data: bodyData,
      message: "decrypted data",
    });
  } catch (error) {
    console.log({ error });

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};
export { encryptions, decryptions };
