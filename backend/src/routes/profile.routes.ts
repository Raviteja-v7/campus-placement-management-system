import { Router } from "express";

import { createStudentProfile, getMyProfile, updateStudentProfile } from "../controllers/profile.controller.js";
import { protect } from "../middlewares/protect.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProfileSchema, updateProfileSchema } from "../validators/profile.validator.js";

const router = Router();

router.post("/", protect, validate(createProfileSchema), createStudentProfile,);
router.get("/me", protect, getMyProfile,);
router.patch("/", protect, validate(updateProfileSchema), updateStudentProfile,);

export default router;