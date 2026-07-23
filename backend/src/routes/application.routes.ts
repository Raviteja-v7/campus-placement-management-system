import { Router } from "express";
import { protect } from "../middlewares/protect.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createApplicationSchema, updateApplicationStatusSchema } from "../validators/application.validator.js";
import { createApplication, getApplications, updateApplicationStatus } from "../controllers/application.controller.js";

const router = Router();

router.post( "/", protect, authorize("student"), validate(createApplicationSchema), createApplication );
router.get( "/", protect, getApplications );
router.patch( "/:id", protect, authorize("admin"), validate(updateApplicationStatusSchema), updateApplicationStatus );

export default router;