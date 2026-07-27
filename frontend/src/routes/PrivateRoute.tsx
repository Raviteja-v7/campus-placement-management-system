import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import { ROLES } from "../constants/roles";
import type { UserRole } from "../types/auth";
import Loader from "../components/common/Loader";

interface PrivateRouteProps {
    allowedRoles: UserRole[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
  return <Navigate to={ROUTES.LOGIN} replace />;
}

if (!allowedRoles.includes(user.role)) {
  return (
    <Navigate
      to={
        user.role === ROLES.ADMIN
          ? ROUTES.ADMIN.DASHBOARD
          : ROUTES.STUDENT.DASHBOARD
      }
      replace
    />
  );
}

  return <Outlet />;
};

export default PrivateRoute;