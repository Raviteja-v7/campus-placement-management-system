import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

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
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside
      className={`flex ${
        mobile ? "h-full" : "h-screen"
      } w-64 flex-col bg-slate-900 text-white shadow-lg`}
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
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            onClick={onClose}
            className={navLinkClass}
          >
            <FiHome className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/jobs"
            onClick={onClose}
            className={navLinkClass}
          >
            <FiBriefcase className="text-lg" />
            <span>Jobs</span>
          </NavLink>

          <NavLink
            to="/admin/applications"
            onClick={onClose}
            className={navLinkClass}
          >
            <FiFileText className="text-lg" />
            <span>Applications</span>
          </NavLink>

          <NavLink
            to="/admin/students"
            onClick={onClose}
            className={navLinkClass}
          >
            <FiUsers className="text-lg" />
            <span>Students</span>
          </NavLink>
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg bg-red-600 px-4 py-3 text-white transition-all duration-200 hover:bg-red-700"
        >
          <FiLogOut className="text-lg" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;