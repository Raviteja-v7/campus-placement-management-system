import type { RequestHandler } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { createProfile, getProfileByUserId, updateProfile, getAllProfiles, getProfileById, uploadProfileImage, uploadResume } from "../services/profile.service.js";
import type { IdParams } from "../types/request.types.js";
import { ApiError } from "../utils/ApiError.js";

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


export const getProfiles: RequestHandler = asyncHandler(async (_req, res) => {
  const profiles = await getAllProfiles();

  res.json({
    success: true,
    data: profiles,
  });
});

export const getProfile: RequestHandler<IdParams> = asyncHandler(
  async (req, res) => {
    const profile = await getProfileById(req.params.id);

    res.json({
      success: true,
      data: profile,
    });
  }
);

export const uploadImage_: RequestHandler = asyncHandler(
  async (req, res) => {
    if (!req.file) {
      throw new ApiError(400, "Image is required");
    }

    const profile = await uploadProfileImage(
      req.user!.id,
      req.file
    );

    res.status(200).json({
      success: true,
      data: profile,
    });
  }
);


export const uploadResume_ = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Resume file is required");
  }

  const profile = await uploadResume(
    req.user!.id,
    req.file
  );

  res.status(200).json({
    success: true,
    data: profile,
  });
});