import express from "express";
import {
  // Creates a validator that generates middlewares
  createValidator,
} from "express-joi-validation";
import { registerSchema, loginSchema } from "./schema";
import {
  loginHandler,
  registerHandler,
} from "../../controllers/authController";

const router = express.Router();
const validator = createValidator();

router.post("/register", validator.body(registerSchema), registerHandler);

router.post("/login", validator.body(loginSchema), loginHandler);

export default router;
