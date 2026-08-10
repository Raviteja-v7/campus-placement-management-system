import * as yup from "yup";

const title = yup.string().trim();
const company = yup
  .string()
  .trim()
  .matches(
    /[A-Za-z]/,
    "Company name must contain at least one letter"
  );

const location = yup
  .string()
  .trim()
  .matches(
    /[A-Za-z]/,
    "Location must contain at least one letter"
  );
  
const description = yup.string().trim();

const requirements = yup
  .array()
  .of(yup.string().trim().required());

const salary = yup.number().min(0);

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

const deadline = yup
  .string()
  .required("Deadline is required")
  .matches(
    /^\d{4}-\d{2}-\d{2}$/,
    "Deadline must be a valid date"
  )
  .test(
    "not-in-past",
    "Deadline cannot be in the past",
    (value) => {
      if (!value) return false;

      const today = new Date();

      const todayString = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(
        today.getDate()
      ).padStart(2, "0")}`;

      return value >= todayString;
    }
  );

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
  deadline,
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