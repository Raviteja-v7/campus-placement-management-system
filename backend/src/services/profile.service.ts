import { StudentProfile } from "../models/StudentProfile.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { CreateProfileInput, UpdateProfileInput } from "../validators/profile.validator.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

interface CreateProfileData extends CreateProfileInput {
  userId: string;
}

export const createProfile = async (data: CreateProfileData) => {
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

export const updateProfile = async (userId: string, updates: UpdateProfileInput) => {
  const profile = await StudentProfile.findOneAndUpdate({ userId }, updates, {
    new: true,
    runValidators: true,
  });

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};


export const getAllProfiles = async () => {
  return StudentProfile.find().populate("userId");
};


export const getProfileById = async (id: string) => {
  const profile = await StudentProfile.findById(id).populate("userId");

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};

export const uploadProfileImage = async (
  userId: string,
  file: Express.Multer.File
) => {
  const profile = await StudentProfile.findOne({ userId });

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  const key = await uploadToS3(file, "profile-images");

  profile.avatarUrl = key;

  await profile.save();

  return profile;
};


export const uploadResume = async (
  userId: string,
  file: Express.Multer.File
) => {
  const profile = await StudentProfile.findOne({ userId });

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  const key = await uploadToS3(file, "resumes");

  profile.resumeUrl = key;

  await profile.save();

  return profile;
};