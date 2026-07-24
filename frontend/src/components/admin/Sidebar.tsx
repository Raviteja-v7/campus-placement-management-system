import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({
  mobile = false,
  onClose,
}: SidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onClose?.();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside
      className={`flex h-full w-64 flex-col bg-slate-900 text-white shadow-lg ${
        mobile ? "" : "min-h-screen"
      }`}
    >
      {/* Logo */}
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold tracking-wide">
          Placement Portal
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <NavLink
          to="/admin/dashboard"
          onClick={onClose}
          className={navLinkClass}
        >
          <FiHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/jobs"
          onClick={onClose}
          className={navLinkClass}
        >
          <FiBriefcase />
          <span>Jobs</span>
        </NavLink>

        <NavLink
          to="/admin/applications"
          onClick={onClose}
          className={navLinkClass}
        >
          <FiFileText />
          <span>Applications</span>
        </NavLink>

        <NavLink
          to="/admin/students"
          onClick={onClose}
          className={navLinkClass}
        >
          <FiUsers />
          <span>Students</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition hover:bg-red-600 hover:text-white"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;