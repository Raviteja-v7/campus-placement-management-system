import { StudentProfile } from "../models/StudentProfile.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { CreateProfileInput, UpdateProfileInput } from "../validators/profile.validator.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { attachSignedUrls } from "../utils/profile.helper.js";
import Application from "../models/Application.model.js";
import Job from "../models/Job.model.js";

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

  return await attachSignedUrls(profile);
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
  const profiles = await StudentProfile.find().populate("userId");

  return Promise.all(
    profiles.map((profile) => attachSignedUrls(profile))
  );
};

export const getProfileById = async (id: string) => {
  const profile = await StudentProfile.findById(id).populate("userId");

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return await attachSignedUrls(profile);
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

  return await attachSignedUrls(profile);
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

  return await attachSignedUrls(profile);
};


export const getDashboardStats = async () => {
    const [
        totalStudents,
        totalJobs,
        totalApplications,
        pendingApplications,
    ] = await Promise.all([
        StudentProfile.countDocuments(),
        Job.countDocuments(),
        Application.countDocuments(),
        Application.countDocuments({
            status: "pending",
        }),
    ]);

    return {
        totalStudents,
        totalJobs,
        totalApplications,
        pendingApplications,
    };
};

export const getStudentDashboard = async (userId: string) => {
    const profile = await StudentProfile.findOne({ userId });

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    const profileCompletionFields = [
        profile.department,
        profile.cgpa,
        profile.phone,
        profile.skills?.length,
        profile.experience,
        profile.avatarUrl,
        profile.resumeUrl,
    ];

    const completedFields =
        profileCompletionFields.filter(Boolean).length;

    const profileCompletion = Math.round(
        (completedFields / profileCompletionFields.length) * 100
    );

    const [appliedJobs, interviews, openJobs] =
        await Promise.all([
            Application.countDocuments({
                student: userId,
            }),

            Application.countDocuments({
                student: userId,
                status: "interview",
            }),

            Job.countDocuments({
                deadline: {
                    $gte: new Date(),
                },
            }),
        ]);

    const recentApplications =
        await Application.find({
            student: userId,
        })
            .populate("job")
            .sort({
                createdAt: -1,
            })
            .limit(5);

    const latestJobs =
        await Job.find({
            deadline: {
                $gte: new Date(),
            },
        })
            .sort({
                createdAt: -1,
            })
            .limit(5);

    return {
        profileCompletion,
        appliedJobs,
        interviews,
        openJobs,
        recentApplications,
        latestJobs,
    };
};