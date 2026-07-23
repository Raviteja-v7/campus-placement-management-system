import type { RequestHandler } from "express";
import type { IdParams } from "../types/request.types.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import * as applicationService from "../services/application.service.js";


export const createApplication: RequestHandler = asyncHandler(async (req, res) => {

  const application = await applicationService.createApplication({
    studentId: req.user!.id,
    jobId: req.body.jobId,
  });

  res.status(201).json({
    success: true,
    data: application,
  });
});

export const getApplications: RequestHandler = asyncHandler(
  async (req, res) => {
    const applications = await applicationService.getApplications(req.user!);

    res.json({
      success: true,
      data: applications,
    });
  }
);

export const updateApplicationStatus: RequestHandler<IdParams> =
  asyncHandler(async (req, res) => {
    const application =
      await applicationService.updateApplicationStatus(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: application,
    });
  });