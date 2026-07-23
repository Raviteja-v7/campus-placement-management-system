import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import { ROLES } from "../constants/roles";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
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

export default PublicRoute;