import { useEffect, useState } from "react";
import {
    FiBriefcase,
    FiCheckCircle,
    FiFileText,
    FiUser,
} from "react-icons/fi";

import { getStudentDashboard } from "../../api/profileApi";
import StudentStatCard from "../../components/profile/StudentStatCard";
import StatusBadge from "../../components/common/StatusBadge";
import type { StudentDashboard } from "../../types/studentDashboard";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();

    const [dashboard, setDashboard] =
        useState<StudentDashboard | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response =
                    await getStudentDashboard();

                setDashboard(response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow">
                Loading dashboard...
            </div>
        );
    }

    if (!dashboard) {
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
                    Welcome back, {user?.username} 👋
                </h1>

                <p className="text-gray-500">
                    Here's what's happening with your placements.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StudentStatCard
                    title="Applied Jobs"
                    value={dashboard.appliedJobs}
                    icon={<FiFileText className="text-white" size={26} />}
                    color="bg-blue-500"
                />

                <StudentStatCard
                    title="Interviews"
                    value={dashboard.interviews}
                    icon={<FiCheckCircle className="text-white" size={26} />}
                    color="bg-green-500"
                />

                <StudentStatCard
                    title="Open Jobs"
                    value={dashboard.openJobs}
                    icon={<FiBriefcase className="text-white" size={26} />}
                    color="bg-purple-500"
                />

                <StudentStatCard
    title="Profile Completion"
    value={dashboard.profileCompletion}
    suffix="%"
    icon={<FiUser className="text-white" size={26} />}
    color="bg-yellow-500"
/>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Applications */}
                <div className="rounded-xl bg-white shadow">
                    <div className="border-b p-5">
                        <h2 className="text-xl font-semibold">
                            Recent Applications
                        </h2>
                    </div>

                    <div className="divide-y">
                        {dashboard.recentApplications.map((application) => (
                            <div
                                key={application._id}
                                className="flex items-center justify-between p-5"
                            >
                                <div>
                                    <p className="font-semibold">
                                        {application.job.company}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {application.job.title}
                                    </p>
                                </div>

                                <StatusBadge
                                    status={application.status}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Latest Jobs */}
                <div className="rounded-xl bg-white shadow">
                    <div className="border-b p-5">
                        <h2 className="text-xl font-semibold">
                            Latest Jobs
                        </h2>
                    </div>

                    <div className="divide-y">
                        {dashboard.latestJobs.map((job) => (
                            <div
                                key={job._id}
                                className="flex items-center justify-between p-5"
                            >
                                <div>
                                    <p className="font-semibold">
                                        {job.company}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {job.title}
                                    </p>
                                </div>

                                <span className="text-sm text-gray-500">
                                    {new Date(
                                        job.deadline
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;