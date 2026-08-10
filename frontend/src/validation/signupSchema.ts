import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .matches(
      /^[A-Za-z0-9_-]+(?: [A-Za-z0-9_-]+)*$/,
      "Username can only contain letters, numbers, spaces, _ and -"
    )
    .matches(
      /[A-Za-z]/,
      "Username must contain at least one letter"
    )
    .required("Username is required"),

  email: Yup.string()
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email"
  )
  .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});