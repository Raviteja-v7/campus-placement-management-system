import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <h2>Admin Layout</h2>
      <Outlet />
    </>
  );
};

export default AdminLayout;