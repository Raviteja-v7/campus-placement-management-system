import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";

import { getProfiles } from "../../api/profileApi";
import type { StudentProfile } from "../../types/profile";

const Students = () => {
    const [students, setStudents] = useState<StudentProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getProfiles();
                setStudents(response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow">
                <p className="text-gray-500">Loading students...</p>
            </div>
        );
    }

    if (!students.length) {
        return (
            <div className="rounded-xl bg-white p-10 text-center shadow">
                <h2 className="text-xl font-semibold text-gray-700">
                    No Students Found
                </h2>

                <p className="mt-2 text-gray-500">
                    No student profiles have been created yet.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-white shadow">
            <div className="border-b p-6">
                <h1 className="text-2xl font-bold">
                    Students
                </h1>

                <p className="text-sm text-gray-500">
                    Manage registered students
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Student
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Department
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                CGPA
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Skills
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Experience
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Phone
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold">
                                Resume
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr
                                key={student._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={student.avatarUrl}
                                            alt={student.userId.username}
                                            className="h-12 w-12 rounded-full object-cover border"
                                        />

                                        <div>
                                            <p className="font-semibold">
                                                {student.userId.username}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {student.userId.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    {student.department}
                                </td>

                                <td className="px-6 py-4">
    <span className="rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">
        {student.cgpa.toFixed(1)}
    </span>
</td>

                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {student.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    {student.experience}
                                </td>

                                <td className="px-6 py-4">
                                    {student.phone}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <a
                                        href={student.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        <FiFileText />
                                        View
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Students;