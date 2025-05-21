import { ActivityCard } from './ActivityCard.component';
import { FC, useEffect, useState } from 'react';
import cameraCheckImage from '../assets/TaskPreviewImage.png';
import { useNavigate } from 'react-router';
import { usersControllerIsTrainingComplete } from '../client';
import { useUser } from '../contexts/User.context';

export const PracticeActivity: FC = () => {
  const navigate = useNavigate();
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const { user } = useUser();

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

    setHasCompleted(hasCompletedResults.data.complete);
  };


  useEffect(() => {
    getHasCompletedTraining();
  }, []);


  return (
    <ActivityCard
      previewImage={cameraCheckImage}
      activityTitle="Practice Task: Model Fractions"
      activityDescription='Click "start" to begin a brief, required tutorial about this site.'
      activityEstimatedTimeSeconds={5 * 60}
      activityComplete={hasCompleted}
      onSelectionAction={() => navigate('/practice')}
    />
  );
};
