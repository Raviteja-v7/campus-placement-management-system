import * as Yup from "yup";

export const jobSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),

  company: Yup.string().trim().required("Company is required"),

  description: Yup.string().trim().required("Description is required"),

  salary: Yup.number()
    .min(0)
    .required("Salary is required"),

  location: Yup.string()
    .trim()
    .required("Location is required"),

  minimumCGPA: Yup.number()
    .min(0)
    .max(10)
    .required("Minimum CGPA is required"),

  deadline: Yup.date().required("Deadline is required"),

  requirements: Yup.string(),

  skillsRequired: Yup.string(),

  eligibleBranches: Yup.string(),
});