import { useState, useEffect } from "react";
import { fetchFoodRecommendations } from "../lib/ai-model";

const useFoodRecommendations = (diet, factor, currentStep) => {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentStep === 2) {
      setIsLoading(true);
      fetchFoodRecommendations(diet, factor)
        .then((response) => {
          const parsedRes = JSON.parse(response);
          setRecommendations(parsedRes);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [currentStep, diet, factor]);

  return { recommendations, isLoading, error };
};

export default useFoodRecommendations;
