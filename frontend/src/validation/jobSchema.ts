import * as Yup from "yup";

export const jobSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title is required"),

  company: Yup.string()
  .trim()
  .matches(
    /[A-Za-z]/,
    "Company name must contain at least one letter"
  )
  .required("Company is required"),

location: Yup.string()
  .trim()
  .matches(
    /[A-Za-z]/,
    "Location must contain at least one letter"
  )
  .required("Location is required"),

  description: Yup.string()
    .trim()
    .required("Description is required"),

  salary: Yup.number()
    .min(0, "Salary cannot be negative")
    .required("Salary is required"),


  minimumCGPA: Yup.number()
    .min(0, "Minimum CGPA cannot be negative")
    .max(10, "Maximum CGPA cannot exceed 10")
    .required("Minimum CGPA is required"),

  deadline: Yup.string()
    .required("Deadline is required")
    .test(
      "not-in-past",
      "Deadline cannot be in the past",
      (value) => {
        if (!value) return false;

        // Get today's date as YYYY-MM-DD
        const today = new Date();

        const todayString = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(
          today.getDate()
        ).padStart(2, "0")}`;

        // Compare date strings directly.
        // YYYY-MM-DD strings sort chronologically.
        return value >= todayString;
      }
    ),

  requirements: Yup.string(),

  skillsRequired: Yup.string(),

  eligibleBranches: Yup.string(),
});