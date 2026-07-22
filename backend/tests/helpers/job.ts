import Job from "../../src/models/Job.model.js";

export const validJobData = {
  title: "Software Engineer",
  company: "OpenAI",
  description: "Backend Engineer",
  requirements: ["Node.js", "Express", "MongoDB"],
  salary: 1800000,
  location: "Hyderabad",
  skillsRequired: ["Node.js", "TypeScript"],
  eligibleBranches: ["CSE", "IT"],
  minimumCGPA: 7.5,
  deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
};

export const createTestJob = async (createdBy: string) => {
  return Job.create({
    ...validJobData,
    createdBy,
  });
};