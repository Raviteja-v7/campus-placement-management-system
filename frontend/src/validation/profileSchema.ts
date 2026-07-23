import * as Yup from "yup";

export const profileSchema = Yup.object({
  department: Yup.string()
    .trim()
    .required("Department is required"),

  cgpa: Yup.number()
    .min(0, "Minimum CGPA is 0")
    .max(10, "Maximum CGPA is 10")
    .required("CGPA is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),

  experience: Yup.string().max(
    1000,
    "Experience is too long"
  ),

  skills: Yup.array()
    .of(Yup.string().trim())
    .min(1, "Add at least one skill"),
});