import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <>
      <h2>Student Layout</h2>
      <Outlet />
    </>
  );
};

export default StudentLayout;