export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  salary: number;
  location: string;
  skillsRequired: string[];
  eligibleBranches: string[];
  minimumCGPA: number;
  deadline: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  hasApplied?: boolean;
}

export interface CreateJobRequest {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  salary: number;
  location: string;
  skillsRequired: string[];
  eligibleBranches: string[];
  minimumCGPA: number;
  deadline: string;
}

export interface UpdateJobRequest
  extends Partial<CreateJobRequest> {}