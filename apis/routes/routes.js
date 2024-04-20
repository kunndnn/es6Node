import { Router } from "express";
const router = Router();
import { body, query } from "express-validator";
import { validationCheck } from "#middlewares/valid";
import { get, set, allUsers } from "../controllers/controllers.js"; // Ensure the correct path and extension
import { encryptions, decryptions } from "../controllers/encryptions.js";
import { errorHandler } from "#middlewares/errorHandler";

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
// Apply errorHandlingMiddleware globally to all route handlers
// router.use(errorHandler);

// Apply errorHandlingMiddleware globally to all route handlers
// router.use(errorHandler);

export default router;
