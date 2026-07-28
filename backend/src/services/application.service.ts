import Application from "../models/Application.model.js";
import Job from "../models/Job.model.js";

import { ApiError } from "../utils/ApiError.js";

import { ROLES } from "../constants/roles.js";
import { APPLICATION_STATUS } from "../constants/applicationStatus.js";

import type { AuthenticatedUser } from "../types/auth.types.js";
import type { UpdateApplicationStatusInput } from "../validators/application.validator.js";

interface CreateApplicationData {
  studentId: string;
  jobId: string;
}

export const createApplication = async (data: CreateApplicationData) => {
  const job = await Job.findById(data.jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const existingApplication = await Application.findOne({
    job: data.jobId,
    student: data.studentId,
  });

  if (existingApplication) {
    throw new ApiError(409, "You have already applied for this job");
  }

  if (job.deadline < new Date()) {
    throw new ApiError(400, "Application deadline has passed");
  }

  const application = await Application.create({
    student: data.studentId,
    job: data.jobId,
    status: APPLICATION_STATUS.PENDING,
  });

  return application;
};

export const getApplications = async (user: AuthenticatedUser) => {
  if (user.role === ROLES.ADMIN) {
    return Application.find()
      .populate("job")
      .populate("student");
  }

  return Application.find({
    student: user.id,
  }).populate("job");
};

export const updateApplicationStatus = async (
  id: string,
  updates: UpdateApplicationStatusInput
) => {
  const application = await Application.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  return application;
};

export const hasStudentApplied = async (
  studentId: string,
  jobId: string
) => {
  const application = await Application.findOne({
    student: studentId,
    job: jobId,
  });

  return !!application;
};