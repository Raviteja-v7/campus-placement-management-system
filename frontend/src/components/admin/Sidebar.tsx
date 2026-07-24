import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Placement Portal
        </h1>

        <p className="text-sm text-gray-500">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <NavLink
          to="/admin/dashboard"
          className={navLinkClass}
        >
          <FiHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/jobs"
          className={navLinkClass}
        >
          <FiBriefcase />
          Jobs
        </NavLink>

        <NavLink
          to="/admin/applications"
          className={navLinkClass}
        >
          <FiFileText />
          Applications
        </NavLink>

        <NavLink
          to="/admin/students"
          className={navLinkClass}
        >
          <FiUsers />
          Students
        </NavLink>
      </nav>

      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;