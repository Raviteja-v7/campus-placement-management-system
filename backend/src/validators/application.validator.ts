import * as yup from "yup";
import {
  APPLICATION_STATUS,
  type ApplicationStatus,} from "../constants/applicationStatus.js";

export const createApplicationSchema = yup.object({
  jobId: yup.string().required("Job ID is required"),
});

export const updateApplicationStatusSchema = yup.object({
  status: yup
    .mixed<ApplicationStatus>()
    .oneOf(Object.values(APPLICATION_STATUS))
    .required("Status is required"),
});

export type CreateApplicationInput = yup.InferType<
  typeof createApplicationSchema
>;

export type UpdateApplicationStatusInput = yup.InferType<
  typeof updateApplicationStatusSchema
>;