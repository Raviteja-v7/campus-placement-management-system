export const APPLICATION_STATUS = {
  PENDING: "pending",
  SHORTLISTED: "shortlisted",
  INTERVIEW: "interview",
  SELECTED: "selected",
  REJECTED: "rejected",
} as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];