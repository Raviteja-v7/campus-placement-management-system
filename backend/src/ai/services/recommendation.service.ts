import Job from "../../models/Job.model.js";
import { StudentProfile } from "../../models/StudentProfile.model.js";

import { ApiError } from "../../utils/ApiError.js";

import { AI_RECOMMENDATIONS } from "../constants.js";
import type { RecommendedJob } from "../types.js";
import { buildStudentDocument } from "../utils/buildStudentDocument.js";
import embeddingService from "./embedding.service.js";
import qdrantService from "./qdrant.service.js";
import resumeService from "./resume.service.js";

class RecommendationService {
  async recommendJobs(userId: string): Promise<RecommendedJob[]> {
    const profile = await StudentProfile.findOne({ userId });

    if (!profile) {
      throw new ApiError(404, "Student profile not found.");
    }

    if (!profile.resumeUrl) {
      throw new ApiError(
        400,
        "Please upload your resume to get AI recommendations."
      );
    }

    const resumeText = await resumeService.extractResumeText(
      profile.resumeUrl
    );

    const studentDocument = buildStudentDocument(
      profile,
      resumeText
    );

    const embedding =
      await embeddingService.generateEmbedding(studentDocument);

    const searchResults = (
      await qdrantService.searchJobs(
        embedding,
        AI_RECOMMENDATIONS.LIMIT
      )
    ).filter(
      (result) =>
        result.score >= AI_RECOMMENDATIONS.MIN_SCORE
    );

    if (searchResults.length === 0) {
      return [];
    }

    const jobIds = searchResults.map(
      (result) => result.jobId
    );

    const jobs = await Job.find({
      _id: { $in: jobIds },
    });

    const jobsMap = new Map(
      jobs.map((job) => [job._id.toString(), job])
    );

    return searchResults
      .map((result) => {
        const job = jobsMap.get(result.jobId);

        if (!job) {
          return null;
        }

        // Branch eligibility
        const isEligibleBranch =
          job.eligibleBranches.length === 0 ||
          job.eligibleBranches.includes(profile.department);

        // CGPA eligibility
        const isEligibleCgpa =
          profile.cgpa >= job.minimumCGPA;

        if (!isEligibleBranch || !isEligibleCgpa) {
          return null;
        }

        return {
          job,
          score: Math.round(result.score * 100),
        };
      })
      .filter(
        (
          item
        ): item is RecommendedJob => item !== null
      );
  }
}

export default new RecommendationService();