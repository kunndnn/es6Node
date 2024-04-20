import { validationResult } from "express-validator";
import { ErrorResponse } from "#helpers/response";
const validationCheck = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(500).json(new ErrorResponse(500, result.array()[0].msg, {}));
    }
    next();
  } catch (error) {
    res.status(500).json(new ErrorResponse(500, "Server error", {}));
  }
};

export { validationCheck };
