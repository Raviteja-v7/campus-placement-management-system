export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",

  STUDENT: {
    DASHBOARD: "/student/dashboard",
    PROFILE: "/student/profile",
    EDIT_PROFILE: "/student/profile/edit",
    JOBS: "/student/jobs",
    APPLICATIONS: "/student/applications",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    JOBS: "/admin/jobs",
    CREATE_JOB: "/admin/jobs/create",
    EDIT_JOB: "/admin/jobs/:id/edit",
    STUDENTS: "/admin/students",
    APPLICATIONS: "/admin/applications",
},
} as const;