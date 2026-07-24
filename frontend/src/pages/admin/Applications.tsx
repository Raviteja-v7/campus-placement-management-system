import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getApplications,
  updateApplicationStatus,
} from "../../api/applicationApi";

import ConfirmDialog from "../../components/ui/ConfirmDialog";
import StatusBadge from "../../components/common/StatusBadge";

import type {
  Application,
  ApplicationStatus,
} from "../../types/application";

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus | null>(null);

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getApplications();
      setApplications(response.data);
    } catch {
      toast.error("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    if (!selectedApplication || !selectedStatus) return;

    try {
      setUpdating(true);

      await updateApplicationStatus(selectedApplication._id, {
        status: selectedStatus,
      });

      setApplications((prev) =>
        prev.map((application) =>
          application._id === selectedApplication._id
            ? {
                ...application,
                status: selectedStatus,
              }
            : application
        )
      );

      toast.success("Application updated successfully.");

      setSelectedApplication(null);
      setSelectedStatus(null);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Failed to update application."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Applications
        </h1>

        <p className="text-gray-500">
          Review and manage student applications.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <p className="text-gray-500">
            No applications found.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left">
                  Student
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-left">
                  Company
                </th>

                <th className="px-6 py-4 text-left">
                  Job
                </th>

                <th className="px-6 py-4 text-left">
                  Applied On
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr
                  key={application._id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {application.student?.username}
                  </td>

                  <td className="px-6 py-4">
                    {application.student?.email}
                  </td>

                  <td className="px-6 py-4">
                    {application.job.company}
                  </td>

                  <td className="px-6 py-4">
                    {application.job.title}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      application.appliedAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <StatusBadge
                      status={application.status}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <select
                      className="rounded-lg border border-gray-300 px-3 py-2"
                      value={application.status}
                      onChange={(e) => {
                        const status =
                          e.target
                            .value as ApplicationStatus;

                        if (
                          status ===
                          application.status
                        )
                          return;

                        setSelectedApplication(
                          application
                        );

                        setSelectedStatus(status);
                      }}
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="shortlisted">
                        Shortlisted
                      </option>

                      <option value="interview">
                        Interview
                      </option>

                      <option value="selected">
                        Selected
                      </option>

                      <option value="rejected">
                        Rejected
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!selectedApplication}
        variant={
          selectedStatus === "rejected"
            ? "danger"
            : "primary"
        }
        title="Update Application Status"
        message={`Change "${selectedApplication?.student?.username}" to "${selectedStatus}"?`}
        confirmText="Update"
        loading={updating}
        onConfirm={handleStatusChange}
        onCancel={() => {
          setSelectedApplication(null);
          setSelectedStatus(null);
        }}
      />
    </div>
  );
};

export default Applications;