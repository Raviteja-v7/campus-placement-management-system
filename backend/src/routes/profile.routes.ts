import { Router } from "express";

import {
  createStudentProfile,
  getMyProfile,
  getProfiles,
  updateStudentProfile,
  getProfile,
  uploadImage_,
  uploadResume_,
} from "../controllers/profile.controller.js";
import { protect } from "../middlewares/protect.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProfileSchema, updateProfileSchema } from "../validators/profile.validator.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { uploadImage } from "../middlewares/uploadImage.middleware.js";
import { uploadResume } from "../middlewares/uploadResume.middleware.js";
const router = Router();

router.post("/me", protect, validate(createProfileSchema), createStudentProfile);
router.get("/me", protect, getMyProfile);
router.patch("/me", protect, validate(updateProfileSchema), updateStudentProfile);
router.get("/", protect, authorize("admin"), getProfiles);
router.post( "/me/image", protect, uploadImage.single("image"), uploadImage_ );
router.post( "/me/resume", protect, uploadResume.single("resume"), uploadResume_ );
router.get( "/:id", protect, authorize("admin"), getProfile );

export default router;
