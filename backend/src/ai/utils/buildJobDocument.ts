import {type IJob } from "../../models/Job.model.js";

export const buildJobDocument = (job: IJob): string => {
  return `
Job Title:
${job.title}

Company:
${job.company}

Description:
${job.description}

Required Skills:
${job.skillsRequired.join(", ")}

Requirements:
${job.requirements.join(", ")}

Eligible Branches:
${job.eligibleBranches.join(", ")}

Minimum CGPA:
${job.minimumCGPA}

Location:
${job.location}
`;
};