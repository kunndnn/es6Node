import { Router } from "express";
const router = Router();
import { body, query } from "express-validator";
import { validationCheck } from "#middlewares/valid";
import { get, set, allUsers, nearByUsers } from "../controllers/controllers.js"; // Ensure the correct path and extension
import { encryptions, decryptions } from "../controllers/encryptions.js";

router
  .get("/get", get)
  .post(
    "/set",
    body("name").notEmpty().withMessage("please enter name").escape().trim(),
    body("latitude")
      .notEmpty()
      .withMessage("please enter latitude")
      .escape()
      .trim(),
    body("longitude")
      .notEmpty()
      .withMessage("please enter longitude")
      .escape()
      .trim(),
    validationCheck,
    set
  );

router.post("/encData", encryptions).post("/decData", decryptions);
router
  .get("/allUsers", allUsers)
  .post(
    "/nearByUsers",
    body("latitude")
      .notEmpty()
      .withMessage("please entry latitude")
      .escape()
      .trim(),
    body("longitude")
      .notEmpty()
      .withMessage("please entry longitude")
      .escape()
      .trim(),
    validationCheck,
    nearByUsers
  );

export default router;
