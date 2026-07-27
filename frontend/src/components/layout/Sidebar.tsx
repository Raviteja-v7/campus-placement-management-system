import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({
  mobile = false,
  onClose,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      path: ROUTES.STUDENT.DASHBOARD,
      icon: <FaHome />,
    },
    {
      label: "Profile",
      path: ROUTES.STUDENT.PROFILE,
      icon: <FaUser />,
    },
    {
      label: "Jobs",
      path: ROUTES.STUDENT.JOBS,
      icon: <FaBriefcase />,
    },
    {
      label: "Applications",
      path: ROUTES.STUDENT.APPLICATIONS,
      icon: <FaFileAlt />,
    },
  ];

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
          Student Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>

                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg bg-red-600 px-4 py-3 text-white transition-all duration-200 hover:bg-red-700"
        >
          <FaSignOutAlt className="text-lg" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;