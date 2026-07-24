import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getJobs } from "../../api/jobApi";

import type { Job } from "../../types/job";

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>

              <p className="mt-2 text-gray-600">
                {job.company}
              </p>

              <p className="text-gray-600">
                {job.location}
              </p>

              <p className="mt-2 font-medium">
                ₹{job.salary.toLocaleString()}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Apply before{" "}
                {new Date(job.deadline).toLocaleDateString()}
              </p>

              <Link
                to={`/student/jobs/${job._id}`}
                className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;