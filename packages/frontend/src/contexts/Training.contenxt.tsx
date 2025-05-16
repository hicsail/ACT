import { createContext, FC, useEffect, useState } from 'react'

const TRAINING_KEY = 'TRAINING_CONTEXT';

interface TrainingLocalStoragePayload {
  hasCompletedCameraCheck?: boolean;
}

export interface TrainingContextPayload {
  hasCompletedCameraCheck: boolean;
  markCameraCheckComplete: () => void;
}

const TrainingContext = createContext({} as TrainingContextPayload);

export interface TrainingProviderProps {
  children: React.ReactNode;
}

export const TrainingContextProvider: FC<TrainingProviderProps> = ({ children }) => {
  const [hasCompletedCameraCheck, setHasCompletedCameraCheck] = useState<boolean>(false);

  useEffect(() => {
    // Try to read back training context information from local storage
    const existingTrainingContext = localStorage.getItem(TRAINING_KEY);
    if(!existingTrainingContext) {
      setHasCompletedCameraCheck(false);
      return;
    }

    // Try to parse the payload
    const trainingContext = JSON.parse(existingTrainingContext) as TrainingLocalStoragePayload;

    // Update the fields accordingly
    setHasCompletedCameraCheck(trainingContext.hasCompletedCameraCheck ? trainingContext.hasCompletedCameraCheck : false);
  }, []);

  const markCameraCheckComplete = () => setHasCompletedCameraCheck(true)

  return (
    <TrainingContext.Provider value={{ hasCompletedCameraCheck, markCameraCheckComplete }}>
      {children}
    </TrainingContext.Provider>
  );
};
