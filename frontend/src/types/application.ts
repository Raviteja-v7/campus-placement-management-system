import type { Job } from "./job";
import type { User } from "./auth";

export type ApplicationStatus =
  | "pending"
  | "shortlisted"
  | "interview"
  | "selected"
  | "rejected";

export interface Application {
  _id: string;

  job: Job;

  student?: User;

  status: ApplicationStatus;

  appliedAt: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateApplicationRequest {
  jobId: string;
}

export interface UpdateApplicationRequest {
  status: ApplicationStatus;
}