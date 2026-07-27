import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getJob } from "../../api/jobApi";
import { applyForJob } from "../../api/applicationApi";

import Button from "../../components/ui/Button";

import type { Job } from "../../types/job";
import Loader from "../../components/common/Loader";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) return;

        const response = await getJob(id);
        setJob(response.data);
      } catch (error) {
        toast.error("Failed to load job.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!job) return;

    try {
      setApplying(true);

      await applyForJob({
        jobId: job._id,
      });

      setHasApplied(true);

      toast.success("Application submitted successfully.");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Failed to apply."
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
      <h1 className="text-3xl font-bold">{job.title}</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 text-gray-700 md:grid-cols-2">
        <p>
          <strong>Company:</strong> {job.company}
        </p>

        <p>
          <strong>Location:</strong> {job.location}
        </p>

        <p>
          <strong>Salary:</strong> ₹
          {job.salary.toLocaleString()}
        </p>

        <p>
          <strong>Minimum CGPA:</strong>{" "}
          {job.minimumCGPA}
        </p>

        <p>
          <strong>Deadline:</strong>{" "}
          {new Date(job.deadline).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">
          Description
        </h2>

        <p className="whitespace-pre-line text-gray-700">
          {job.description}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">
          Requirements
        </h2>

        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          {job.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">
          Skills Required
        </h2>

        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          {job.skillsRequired.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">
          Eligible Branches
        </h2>

        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          {job.eligibleBranches.map((branch) => (
            <li key={branch}>{branch}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <Button
          onClick={handleApply}
          disabled={applying || hasApplied}
        >
          {hasApplied
            ? "Applied"
            : applying
            ? "Applying..."
            : "Apply Now"}
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;