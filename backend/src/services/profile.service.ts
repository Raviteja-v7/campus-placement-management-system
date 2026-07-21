import { StudentProfile } from "../models/StudentProfile.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { CreateProfileInput, UpdateProfileInput, } from "../validators/profile.validator.js";

interface CreateProfileData extends CreateProfileInput {
  userId: string;
}

export const createProfile = async (
  data: CreateProfileData,
) => {
  const existingProfile = await StudentProfile.exists({
    userId: data.userId,
  });

  if (existingProfile) {
    throw new ApiError(409, "Profile already exists");
  }

  const profile = await StudentProfile.create(data);

  return profile;
};


export const getProfileByUserId = async (userId: string) => {
  const profile = await StudentProfile.findOne({ userId });

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};


export const updateProfile = async (
  userId: string,
  updates: UpdateProfileInput,
) => {
  const profile = await StudentProfile.findOneAndUpdate(
    { userId },
    updates,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};