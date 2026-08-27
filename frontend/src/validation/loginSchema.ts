import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
  .trim()
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email"
  )
  .required("Email is required"),

  password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
});