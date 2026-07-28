import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getApplications } from "../../api/applicationApi";

import StatusBadge from "../../components/common/StatusBadge";
import Loader from "../../components/common/Loader";

import type { Application } from "../../types/application";

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications();
        setApplications(response.data);
      } catch (error) {
        toast.error("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          My Applications
        </h1>

        <p className="text-gray-500">
          Track the status of your job applications.
        </p>
      </div>

      {/* Content */}
      {applications.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <p className="text-gray-500">
            You haven't applied for any jobs yet.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-187.5 w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Company
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Job
                  </th>

                  <th className="px-6 py-4 text-left font-semibold whitespace-nowrap">
                    Applied On
                  </th>

                  <th className="min-w-35 px-6 py-4 text-center font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {application.job.company}
                    </td>

                    <td className="px-6 py-4">
                      {application.job.title}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(
                        application.appliedAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <StatusBadge
                        status={application.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;