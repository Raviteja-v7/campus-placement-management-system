import { Router } from "express";

import { createCollection, getRecommendations, indexAllJobs, reindexJobs } from "../controllers/ai.controller.js";
import { protect } from "../../middlewares/protect.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";

const router = Router();

router.post( "/index/jobs", protect, authorize("admin"), indexAllJobs );
router.post( "/reindex/jobs", protect, authorize("admin"), reindexJobs );
router.post("/collection", protect, createCollection);
router.get( "/recommendations", protect, getRecommendations );

export default router;