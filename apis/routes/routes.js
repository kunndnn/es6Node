import { Router } from "express";
const router = Router();
import { body, query } from "express-validator";
import { validationCheck } from "../../middlewares/valid.js";
import { get, set } from "../controllers/controllers.js"; // Ensure the correct path and extension
router.get("/get", get);
router.post(
  "/set",
  body("name").notEmpty().withMessage("please enter name").escape().trim(),
  validationCheck,
  set
);

export default router;
