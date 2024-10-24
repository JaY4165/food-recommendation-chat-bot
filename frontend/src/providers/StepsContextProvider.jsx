/* eslint-disable react/prop-types */
import { useState } from "react";
import StepsContext from "../contexts/stepsContext";

const StepsContextProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const incrementStep = async () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <StepsContext.Provider value={{ currentStep, incrementStep }}>
      {children}
    </StepsContext.Provider>
  );
};

export default StepsContextProvider;
