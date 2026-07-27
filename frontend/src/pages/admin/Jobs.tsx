import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import { getJobs, deleteJob } from "../../api/jobApi";
import { ROUTES } from "../../constants/routes";

import type { Job } from "../../types/job";
import Loader from "../../components/common/Loader";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async () => {
    if (!selectedJob) return;

    try {
      setDeleting(true);

      await deleteJob(selectedJob._id);

      setJobs((prev) =>
        prev.filter((job) => job._id !== selectedJob._id)
      );

      toast.success("Job deleted successfully");

      setSelectedJob(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Jobs</h1>

          <p className="text-gray-500">
            Create, update, and manage job postings.
          </p>
        </div>

        <Button onClick={() => navigate(ROUTES.ADMIN.CREATE_JOB)}>
          + Create Job
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <Loader />
      ) : jobs.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow">
          <p className="text-gray-500">No jobs created yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Company</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Deadline</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-t">
                  <td className="px-6 py-4">{job.title}</td>

                  <td className="px-6 py-4">{job.company}</td>

                  <td className="px-6 py-4">{job.location}</td>

                  <td className="px-6 py-4">
                    {new Date(job.deadline).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/edit`)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => setSelectedJob(job)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ONE Confirmation Dialog */}
      <ConfirmDialog
        open={!!selectedJob}
        variant="danger"
        title="Delete Job"
        message={`Are you sure you want to delete "${
          selectedJob?.title ?? ""
        }"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setSelectedJob(null)}
      />
    </div>
  );
};

export default Jobs;