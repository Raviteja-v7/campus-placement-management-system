import { Router } from "express";

import * as jobController from "../controllers/job.controller.js";
import { protect } from "../middlewares/protect.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createJobSchema,
  updateJobSchema,
} from "../validators/job.validator.js";

const router = Router();

router.get("/", protect, jobController.getJobs);

router.get("/:id", protect, jobController.getJob);

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createJobSchema),
  jobController.createJob
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateJobSchema),
  jobController.updateJob
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  jobController.deleteJob
);

export default router;