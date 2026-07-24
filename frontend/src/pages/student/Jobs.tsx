import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getJobs } from "../../api/jobApi";
import { getRecommendations } from "../../api/aiApi";

import type { Job } from "../../types/job";

type RecommendedJob = {
  job: Job;
  score: number;
};

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<
    RecommendedJob[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    setLoading(true);

    try {
      const response = await getJobs();
      setJobs(response.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    setLoading(true);

    try {
      const data = await getRecommendations();
      setRecommendedJobs(data);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendations = async () => {
    if (!showRecommended && recommendedJobs.length === 0) {
      await fetchRecommendations();
    }

    setShowRecommended(true);
  };

  const handleBackToAllJobs = () => {
    setShowRecommended(false);
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  const displayedJobs = showRecommended
    ? recommendedJobs.map((item) => ({
        ...item.job,
        score: item.score,
      }))
    : jobs;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {showRecommended
            ? "AI Recommended Jobs"
            : "Available Jobs"}
        </h1>

        {!showRecommended ? (
          <button
            onClick={handleRecommendations}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            ✨ AI Recommended
          </button>
        ) : (
          <button
            onClick={handleBackToAllJobs}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            ← Back to All Jobs
          </button>
        )}
      </div>

      {displayedJobs.length === 0 ? (
        <p>
          {showRecommended
            ? "No AI recommendations found."
            : "No jobs available."}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {displayedJobs.map((job: any) => (
            <div
              key={job._id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {job.title}
                </h2>

                {showRecommended && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Relevance Score: {job.score}%
                  </span>
                )}
              </div>

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