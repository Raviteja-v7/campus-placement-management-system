import type { JobDocument } from "../models/Job.model.js";

export interface SearchResult {
  jobId: string;
  score: number;
}

export interface RecommendedJob {
  job: JobDocument;
  score: number;
}