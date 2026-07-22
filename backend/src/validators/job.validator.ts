import * as yup from "yup";

const title = yup.string().trim();
const company = yup.string().trim();
const description = yup.string().trim();

const requirements = yup
  .array()
  .of(yup.string().trim().required());

const salary = yup.number().min(0);

const location = yup.string().trim();

const skillsRequired = yup
  .array()
  .of(yup.string().trim().required());

const eligibleBranches = yup
  .array()
  .of(yup.string().trim().required());

const minimumCGPA = yup
  .number()
  .min(0)
  .max(10);

const deadline = yup.date();

export const createJobSchema = yup.object({
  title: title.required(),
  company: company.required(),
  description: description.required(),
  requirements: requirements.default([]),
  salary: salary.required(),
  location: location.required(),
  skillsRequired: skillsRequired.default([]),
  eligibleBranches: eligibleBranches.default([]),
  minimumCGPA: minimumCGPA.required(),
  deadline: deadline.required(),
});

export const updateJobSchema = yup.object({
  title,
  company,
  description,
  requirements,
  salary,
  location,
  skillsRequired,
  eligibleBranches,
  minimumCGPA,
  deadline,
});

export type CreateJobInput = yup.InferType<typeof createJobSchema>;
export type UpdateJobInput = yup.InferType<typeof updateJobSchema>;