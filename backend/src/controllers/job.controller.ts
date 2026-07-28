import type { RequestHandler } from "express";
import type { IdParams } from "../types/request.types.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import * as jobService from "../services/job.service.js";
import * as applicationService from "../services/application.service.js";

export const createJob: RequestHandler = asyncHandler(async (req, res) => {
  const job = await jobService.createJob(req.body, req.user!.id);

  res.status(201).json({
    success: true,
    data: job,
  });
});

export const getJobs: RequestHandler = asyncHandler(async (_req, res) => {
  const jobs = await jobService.getAllJobs();

  res.json({
    success: true,
    data: jobs,
  });
});

export const getJob: RequestHandler<IdParams> = asyncHandler(async (req, res) => {
    const job = await jobService.getJobById(req.params.id);
    const hasApplied =
    await applicationService.hasStudentApplied(
        req.user!.id,
        req.params.id
    );

    res.json({
      success: true,
      data: { ...job.toObject(), hasApplied },
    });
  }
);

export const updateJob: RequestHandler<IdParams> = asyncHandler(async (req, res) => {
  const job = await jobService.updateJob(req.params.id, req.body);

  res.json({
    success: true,
    data: job,
  });
});

export const deleteJob: RequestHandler<IdParams> = asyncHandler(async (req, res) => {
  await jobService.deleteJob(req.params.id);

  res.status(204).send();
});