import type { Application } from "./application";
import type { Job } from "./job";

export interface StudentDashboard {
    profileCompletion: number;
    appliedJobs: number;
    interviews: number;
    openJobs: number;

    recentApplications: Application[];
    latestJobs: Job[];
}