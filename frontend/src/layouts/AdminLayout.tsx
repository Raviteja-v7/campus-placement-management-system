import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/Sidebar";
import AdminNavbar from "../components/admin/Navbar";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />

            <div className="flex flex-1 flex-col">
                <AdminNavbar />

                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;