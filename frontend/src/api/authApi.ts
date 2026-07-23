import api from "./axios";
import type { ApiResponse } from "../types/api";
import type { LoginRequest, SignupRequest, User } from "../types/auth";

export const signup = async (data: SignupRequest) => {
  const response = await api.post<ApiResponse<User>>("/auth/signup", data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await api.post<ApiResponse<User>>("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post<ApiResponse<null>>("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get<ApiResponse<User>>("/auth/me");
  return response.data;
};