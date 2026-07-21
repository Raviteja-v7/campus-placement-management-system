import * as yup from "yup";

const department = yup.string().trim();

const cgpa = yup.number().min(0, "CGPA must be at least 0").max(10, "CGPA cannot exceed 10");

const skills = yup.array().of(yup.string().trim().required());

const experience = yup.string().trim();

const phone = yup
  .string()
  .trim()
  .matches(/^[6-9]\d{9}$/, "Invalid phone number");
const avatarUrl = yup.string().url("Avatar URL must be valid");

const resumeUrl = yup.string().url("Resume URL must be valid");

export const createProfileSchema = yup.object({
  department: department.required("Department is required"),
  cgpa: cgpa.required("CGPA is required"),
  skills: skills.default([]),
  experience: experience.default(""),
  phone: phone.required("Phone number is required"),
  avatarUrl,
  resumeUrl,
});

export const updateProfileSchema = yup.object({
  department,
  cgpa,
  skills,
  experience,
  phone,
  avatarUrl,
  resumeUrl,
});

export type CreateProfileInput = yup.InferType<typeof createProfileSchema>;

export type UpdateProfileInput = yup.InferType<typeof updateProfileSchema>;
