import { Router } from "express";

import { registerUser, loginUser, getMe, logoutUser } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { protect } from "../middlewares/protect.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser,);

router.get("/me", protect, getMe,);

router.post("/logout", logoutUser);

export default router;