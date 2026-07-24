import { Link } from "react-router-dom";

export default function RecommendedJobCard({
  recommendation,
}: any) {
  const { job, score } = recommendation;

  return (
    <div className="rounded-lg border p-5 shadow-sm">
      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-xl font-semibold">
            {job.title}
          </h2>

          <p className="text-gray-500">
            {job.company}
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-4 py-1 text-green-700 font-semibold">
          {score}% Match
        </span>
      </div>

      <p className="mt-4">
        {job.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skillsRequired.map((skill: string) => (
          <span
            key={skill}
            className="rounded bg-gray-100 px-2 py-1 text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex justify-between items-center">
        <div>
          <p>{job.location}</p>
          <p>₹ {job.salary}</p>
        </div>

        <Link
          to={`/jobs/${job._id}`}
          className="rounded bg-blue-600 text-white px-4 py-2"
        >
          View Job
        </Link>
      </div>
    </div>
  );
}