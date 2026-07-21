import type { RequestHandler } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { createProfile, getProfileByUserId, updateProfile } from "../services/profile.service.js";

export const createStudentProfile: RequestHandler = asyncHandler(async (req, res) => {
  const profile = await createProfile({
    ...req.body,
    userId: req.user!.id,
  });

  res.status(201).json({
    success: true,
    message: "Profile created successfully",
    data: profile,
  });
});

export const getMyProfile: RequestHandler = asyncHandler(async (req, res) => {
  const profile = await getProfileByUserId(req.user!.id);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

export const updateStudentProfile: RequestHandler = asyncHandler(async (req, res) => {
  const profile = await updateProfile(req.user!.id, req.body);

  res.status(200).json({
    success: true,
    data: profile,
  });
});
