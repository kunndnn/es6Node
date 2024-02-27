import { validationResult } from "express-validator";

const validationCheck = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(500).json({
        status: false,
        message: result.array()[0].msg,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { validationCheck };
