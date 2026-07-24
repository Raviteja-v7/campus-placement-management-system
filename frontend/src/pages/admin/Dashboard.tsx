import { useEffect, useState } from "react";
import {
    FiUsers,
    FiBriefcase,
    FiFileText,
    FiClock,
} from "react-icons/fi";

import { getDashboardStats } from "../../api/profileApi";
import StatCard from "../../components/admin/StatCard";
import type { DashboardStats } from "../../types/dashboard";

const Dashboard = () => {
    const [stats, setStats] =
        useState<DashboardStats | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response =
                    await getDashboardStats();

                setStats(response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow">
                Loading dashboard...
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="rounded-xl bg-white p-6 shadow">
                Failed to load dashboard.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500">
                    Welcome back, Admin.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Students"
                    value={stats.totalStudents}
                    icon={<FiUsers size={28} className="text-white" />}
                    color="bg-blue-500"
                />

                <StatCard
                    title="Jobs"
                    value={stats.totalJobs}
                    icon={<FiBriefcase size={28} className="text-white" />}
                    color="bg-green-500"
                />

                <StatCard
                    title="Applications"
                    value={stats.totalApplications}
                    icon={<FiFileText size={28} className="text-white" />}
                    color="bg-purple-500"
                />

                <StatCard
                    title="Pending"
                    value={stats.pendingApplications}
                    icon={<FiClock size={28} className="text-white" />}
                    color="bg-yellow-500"
                />
            </div>
        </div>
    );
};

export default Dashboard;