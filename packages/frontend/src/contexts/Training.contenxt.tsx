import { createContext, FC, useContext, useEffect, useState } from 'react';
import { usersControllerIsTrainingComplete } from '../client';
import { useUser } from '../contexts/User.context';

const TRAINING_KEY = 'TRAINING_CONTEXT';

interface TrainingLocalStoragePayload {
  hasCompletedCameraCheck?: boolean;
}

export interface TrainingContextPayload {
  hasCompletedCameraCheck: boolean;
  markCameraCheckComplete: () => void;
  hasCompletedTraining: boolean;
  markCompletedTraining: () => void;
}

const TrainingContext = createContext({} as TrainingContextPayload);

export interface TrainingProviderProps {
  children: React.ReactNode;
}

export const TrainingContextProvider: FC<TrainingProviderProps> = ({ children }) => {
  const [hasCompletedCameraCheck, setHasCompletedCameraCheck] = useState<boolean>(false);
  const [hasCompletedTraining, setHasCompletedTraining] = useState<boolean>(false);
  const { user } = useUser();

  const loadTrainingContext = () => {
    const existingTrainingContext = localStorage.getItem(TRAINING_KEY);
    if (!existingTrainingContext) {
      return null;
    }
    return JSON.parse(existingTrainingContext) as TrainingLocalStoragePayload;
  };

  const getHasCompletedTraining = async () => {
    const hasCompletedResults = await usersControllerIsTrainingComplete({
      path: {
        id: user!.id
      }
    });

    if (hasCompletedResults.error || !hasCompletedResults.data) {
      console.error(hasCompletedResults.error);
      return;
    }

    setHasCompletedTraining(hasCompletedResults.data.complete);
  };

  const saveContext = (context: TrainingLocalStoragePayload) => {
    localStorage.setItem(TRAINING_KEY, JSON.stringify(context));
  };

  useEffect(() => {
    const existingContext = loadTrainingContext();

    if (user) {
      getHasCompletedTraining();
    }

    // Update the fields accordingly
    setHasCompletedCameraCheck(
      existingContext?.hasCompletedCameraCheck ? existingContext.hasCompletedCameraCheck : false
    );
  }, [user]);

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
    <TrainingContext.Provider
      value={{
        hasCompletedCameraCheck,
        markCameraCheckComplete,
        hasCompletedTraining,
        markCompletedTraining: () => getHasCompletedTraining()
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => useContext(TrainingContext);
