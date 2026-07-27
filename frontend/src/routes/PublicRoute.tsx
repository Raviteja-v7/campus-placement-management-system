import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import { ROLES } from "../constants/roles";
import Loader from "../components/common/Loader";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
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