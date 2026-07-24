import { FiMenu } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          className="rounded-md p-2 transition hover:bg-gray-100 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 md:text-2xl">
            Welcome, {user?.username}
          </h2>

          <p className="hidden text-sm text-gray-500 md:block">
            Student Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <div className="hidden md:block">
          <p className="font-medium text-gray-800">
            {user?.username}
          </p>

          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;