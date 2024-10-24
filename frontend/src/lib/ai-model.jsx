import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchFoodRecommendations = async (
  diet,
  factor,
  retries = 3,
  baseDelay = 1000
) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/recommend-food",
        {
          diet,
          factor,
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log(
          `Rate limited. Retrying in ${(baseDelay * 2 ** i) / 1000} seconds...`
        );
        await delay(baseDelay * 2 ** i);
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries reached. Unable to fetch recommendations.");
};
