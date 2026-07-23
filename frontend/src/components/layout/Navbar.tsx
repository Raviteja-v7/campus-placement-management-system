import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user?.username}
        </h2>

        <p className="text-sm text-gray-500">
          Student Dashboard
        </p>
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