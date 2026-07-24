import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between border-b bg-white px-8 py-4">
            <h2 className="text-2xl font-bold">
                Admin Dashboard
            </h2>

            <div className="text-right">
                <p className="font-semibold">
                    {user?.username}
                </p>

                <p className="text-sm text-gray-500">
                    {user?.email}
                </p>
            </div>
        </header>
    );
};

export default Navbar;