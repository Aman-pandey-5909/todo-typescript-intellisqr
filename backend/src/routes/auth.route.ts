import express from "express";
const router = express.Router();
import { registerSchema, loginSchema } from "../schemas/authSchemas";
import { validate } from "../middleware/validate";
import { verifySession } from "../middleware/verifysession";

import {
  register,
  reset,
  login,
  logout,
  forgot,
  validatereset
} from "../controllers/auth.controller";

router.post("/auth/register", validate(registerSchema), register);
router.post("/auth/login", validate(loginSchema), login);
router.post("/auth/logout", verifySession, logout);
router.post("/auth/forgot", forgot);
router.post("/auth/reset", reset);
router.get("/auth/validatereset", validatereset);

export default router;
 