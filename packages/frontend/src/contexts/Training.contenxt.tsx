import { createContext, FC, useContext, useEffect, useState } from 'react';

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

  const loadTrainingContext = () => {
    const existingTrainingContext = localStorage.getItem(TRAINING_KEY);
    if (!existingTrainingContext) {
      return null;
    }
    return JSON.parse(existingTrainingContext) as TrainingLocalStoragePayload;
  };

  const saveContext = (context: TrainingLocalStoragePayload) => {
    localStorage.setItem(TRAINING_KEY, JSON.stringify(context));
  };

  useEffect(() => {
    const existingContext = loadTrainingContext();

    // Update the fields accordingly
    setHasCompletedCameraCheck(
      existingContext?.hasCompletedCameraCheck ? existingContext.hasCompletedCameraCheck : false
    );
  }, []);

  const markCameraCheckComplete = () => {
    setHasCompletedCameraCheck(true);

    // Make sure to use the currently stored data
    let existingContext = loadTrainingContext();
    if (!existingContext) {
      existingContext = {};
    }

    // Update the camera check field and save
    existingContext.hasCompletedCameraCheck = true;
    saveContext(existingContext);
  };

  return (
    <TrainingContext.Provider value={{ hasCompletedCameraCheck, markCameraCheckComplete }}>
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => useContext(TrainingContext);
