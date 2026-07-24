import type { User } from "./auth";

export interface StudentProfile {
  _id: string;

  userId: User;

  department: string;
  cgpa: number;
  phone: string;
  skills: string[];
  experience: string;

  avatarUrl: string;
  resumeUrl: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileRequest {
  department: string;
  cgpa: number;
  phone: string;
  skills: string[];
  experience: string;
}

export interface UpdateProfileRequest
  extends Partial<CreateProfileRequest> {}