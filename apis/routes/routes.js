import { Router } from "express";
const router = Router();
import { body, query } from "express-validator";
import { validationCheck } from "#middlewares/valid";
import { get, set, allUsers } from "../controllers/controllers.js"; // Ensure the correct path and extension
import { encryptions, decryptions } from "../controllers/encryptions.js";

router
  .get("/get", get)
  .post(
    "/set",
    body("name").notEmpty().withMessage("please enter name").escape().trim(),
    validationCheck,
    set
  );

router.post("/encData", encryptions).post("/decData", decryptions);
router.get("/allUsers", allUsers);

export default router;
