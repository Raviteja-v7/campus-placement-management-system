import Job from "../models/Job.model.js";
import { ApiError } from "../utils/ApiError.js";
import type {
  CreateJobInput,
  UpdateJobInput,
} from "../validators/job.validator.js";

export const createJob = async (
  data: CreateJobInput,
  createdBy: string
) => {
  return await Job.create({
    ...data,
    createdBy,
  });
};

export const getAllJobs = async () => {
  return await Job.find().sort({ createdAt: -1 });
};

export const getJobById = async (id: string) => {
  const job = await Job.findById(id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  return job;
};

export const updateJob = async (
  id: string,
  data: UpdateJobInput
) => {
  const job = await Job.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  return job;
};

export const deleteJob = async (id: string) => {
  const job = await Job.findByIdAndDelete(id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  return;
};