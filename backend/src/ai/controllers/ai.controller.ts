import { asyncHandler } from "../../utils/asyncHandler.js";
import jobIndexingService from "../services/jobIndexing.service.js";
import qdrantService from "../services/qdrant.service.js";
import recommendationService from "../services/recommendation.service.js";

export const indexAllJobs = asyncHandler(async (_req, res) => {
  await jobIndexingService.indexAllJobs();

  res.status(200).json({
    success: true,
    message: "All jobs indexed successfully.",
  });
});

export const reindexJobs = asyncHandler(async (_req, res) => {
  await jobIndexingService.reindexAllJobs();

  res.status(200).json({
    success: true,
    message: "Jobs reindexed successfully.",
  });
});

export const createCollection = asyncHandler(async (_req, res) => {
  await qdrantService.createCollection();

  res.status(200).json({
    success: true,
    message: "Collection created successfully.",
  });
});

export const getRecommendations = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const jobs = await recommendationService.recommendJobs(
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: jobs,
  });
});
