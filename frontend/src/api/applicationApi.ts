import api from "./axios";

import type {
  Application,
  CreateApplicationRequest,
  UpdateApplicationRequest,
} from "../types/application";

import type { ApiResponse } from "../types/api";

export const getApplications = async () => {
  const response =
    await api.get<ApiResponse<Application[]>>(
      "/applications"
    );

  return response.data;
};

export const applyForJob = async (
  data: CreateApplicationRequest
) => {
  const response =
    await api.post<ApiResponse<Application>>(
      "/applications",
      data
    );

  return response.data;
};

export const updateApplicationStatus = async (
  id: string,
  data: UpdateApplicationRequest
) => {
  const response =
    await api.patch<ApiResponse<Application>>(
      `/applications/${id}`,
      data
    );

  return response.data;
};