import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
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
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 text-white shadow-lg">
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
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>

                <span className="font-medium">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white"
        >
          <FaSignOutAlt />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;