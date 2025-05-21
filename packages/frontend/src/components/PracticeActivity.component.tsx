import { ActivityCard } from './ActivityCard.component';
import { FC } from 'react';
import cameraCheckImage from '../assets/TaskPreviewImage.png';
import { useNavigate } from 'react-router';
import { useTraining } from '../contexts/Training.contenxt';

export const PracticeActivity: FC = () => {
  const navigate = useNavigate();
  const { hasCompletedTraining } = useTraining();

  return (
    <ActivityCard
      previewImage={cameraCheckImage}
      activityTitle="Practice Task: Model Fractions"
      activityDescription='Click "start" to begin a brief, required tutorial about this site.'
      activityEstimatedTimeSeconds={5 * 60}
      activityComplete={hasCompletedTraining}
      onSelectionAction={() => navigate('/practice')}
    />
  );
};
