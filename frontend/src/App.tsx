import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import StudentDashboard from "./pages/student/Dashboard";
import Profile from "./pages/student/Profile";
import EditProfile from "./pages/student/EditProfile";
import Jobs from "./pages/student/Jobs";
import JobDetails from "./pages/student/JobDetails";
import Applications from "./pages/student/Applications";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminJobs from "./pages/admin/Jobs";
import Students from "./pages/admin/Students";
import AdminApplications from "./pages/admin/Applications";
import CreateJob from "./pages/admin/CreateJob";
import EditJob from "./pages/admin/EditJob";

import { ROUTES } from "./constants/routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
          </Route>
        </Route>

        {/* Student Routes */}
        <Route element={<PrivateRoute allowedRoles={["student"]} />}>
          <Route element={<StudentLayout />}>
            <Route
              path={ROUTES.STUDENT.DASHBOARD}
              element={<StudentDashboard />}
            />
            <Route path={ROUTES.STUDENT.PROFILE} element={<Profile />} />
            <Route
              path={ROUTES.STUDENT.EDIT_PROFILE}
              element={<EditProfile />}
            />
            <Route path={ROUTES.STUDENT.JOBS} element={<Jobs />} />
            <Route
              path={`${ROUTES.STUDENT.JOBS}/:id`}
              element={<JobDetails />}
            />
            <Route
              path={ROUTES.STUDENT.APPLICATIONS}
              element={<Applications />}
            />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />

            <Route path={ROUTES.ADMIN.JOBS} element={<AdminJobs />} />

            <Route path={ROUTES.ADMIN.CREATE_JOB} element={<CreateJob />} />

            <Route path={ROUTES.ADMIN.EDIT_JOB} element={<EditJob />} />

            <Route path={ROUTES.ADMIN.STUDENTS} element={<Students />} />

            <Route
              path={ROUTES.ADMIN.APPLICATIONS}
              element={<AdminApplications />}
            />
          </Route>
        </Route>

        {/* Default */}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

        {/* 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
