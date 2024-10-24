/* eslint-disable react/prop-types */
import { useState } from "react";
import FoodContext from "../contexts/foodContext";
const FoodContextProvider = ({ children }) => {
  const [diet, setDiet] = useState([]);
  const [factor, setFactor] = useState([]);

  const updateDiet = async (dietArr) => {
    setDiet((prev) => [...prev, ...dietArr]);
  };

  const updateFactor = async (factorArr) => {
    setFactor((prev) => [...prev, ...factorArr]);
  };

  return (
    <FoodContext.Provider value={{ updateDiet, updateFactor, diet, factor }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContextProvider;
