import api from "./axios";

import type { ApiResponse } from "../types/api";
import type {
  StudentProfile,
  CreateProfileRequest,
  UpdateProfileRequest,
} from "../types/profile";
import type { DashboardStats } from "../types/dashboard";
import type { StudentDashboard } from "../types/studentDashboard";

export const getMyProfile = async () => {
  const response =
    await api.get<ApiResponse<StudentProfile>>(
      "/profile/me"
    );

  return response.data;
};


export const getProfiles = async () => {
    const response = await api.get<ApiResponse<StudentProfile[]>>("/profile");
    return response.data;
};


export const createProfile = async (
  data: CreateProfileRequest
) => {
  const response =
    await api.post<ApiResponse<StudentProfile>>(
      "/profile/me",
      data
    );

  return response.data;
};

export const updateProfile = async (
  data: UpdateProfileRequest
) => {
  const response =
    await api.patch<ApiResponse<StudentProfile>>(
      "/profile/me",
      data
    );

  return response.data;
};

export const uploadProfileImage = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("image", file);

  const response =
    await api.post<ApiResponse<StudentProfile>>(
      "/profile/me/image",
      formData
    );

  return response.data;
};

export const uploadResume = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response =
    await api.post<ApiResponse<StudentProfile>>(
      "/profile/me/resume",
      formData
    );

  return response.data;
};

export const getDashboardStats = async () => {
    const response = await api.get<ApiResponse<DashboardStats>>(
        "/profile/dashboard"
    );

    return response.data;
};

export const getStudentDashboard = async () => {
    const response = await api.get<ApiResponse<StudentDashboard>>(
        "/profile/student-dashboard"
    );

    return response.data;
};