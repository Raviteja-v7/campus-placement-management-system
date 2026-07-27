import { useEffect, useState } from "react";
import { getRecommendations } from "../../api/aiApi";
import RecommendedJobCard from "../../components/jobs/RecommendedJobCard";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await getRecommendations();
      setRecommendations(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading recommendations...</h2>;
  }

  if (recommendations.length === 0) {
    return (
      <h2>
        No job recommendations found.
      </h2>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        AI Recommended Jobs
      </h1>

      <div className="grid gap-6">
        {recommendations.map((item: any) => (
          <RecommendedJobCard
            key={item.job._id}
            recommendation={item}
          />
        ))}
      </div>
    </div>
  );
}