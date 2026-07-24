import api from "./axios";

export const getRecommendations = async () => {
  const response = await api.get("/ai/recommendations");
  return response.data.data;
};