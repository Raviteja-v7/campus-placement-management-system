import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
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

  email: yup
  .string()
  .trim()
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Invalid email address"
  )
  .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const loginSchema = yup.object({
  email: yup.string().trim().email("Invalid email").required("Email is required"),

  password: yup.string().required("Password is required"),
});

export type RegisterInput = yup.InferType<typeof registerSchema>;
export type LoginInput = yup.InferType<typeof loginSchema>;
