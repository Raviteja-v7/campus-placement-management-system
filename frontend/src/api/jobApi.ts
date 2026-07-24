import api from "./axios";

import type { ApiResponse } from "../types/api";
import type {
  Job,
  CreateJobRequest,
  UpdateJobRequest,
} from "../types/job";

export const getJobs = async () => {
  const response =
    await api.get<ApiResponse<Job[]>>("/jobs");

  return response.data;
};

export const getJob = async (id: string) => {
  const response =
    await api.get<ApiResponse<Job>>(`/jobs/${id}`);

  return response.data;
};

export const createJob = async (
  data: CreateJobRequest
) => {
  const response =
    await api.post<ApiResponse<Job>>("/jobs", data);

  return response.data;
};

export const updateJob = async (
  id: string,
  data: UpdateJobRequest
) => {
  const response =
    await api.patch<ApiResponse<Job>>(
      `/jobs/${id}`,
      data
    );

  return response.data;
};

export const deleteJob = async (id: string) => {
  const response =
    await api.delete<ApiResponse<null>>(
      `/jobs/${id}`
    );

  return response.data;
};