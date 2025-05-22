import { FC } from 'react';
import { useNavigate } from 'react-router';
import { ActivityCard } from '../ActivityCard.component';
import cameraCheckImage from '../../assets/TaskPreviewImage.png';
import { useTraining } from '../../contexts/Training.contenxt';

export const CameraCheckActivity: FC = () => {
  const navigate = useNavigate();
  const training = useTraining();

  return (
    <ActivityCard
      previewImage={cameraCheckImage}
      activityTitle="Camera and Mic Check"
      activityDescription="Click start to check that your camera and microphone are working properly, by recording a five second video. This is essential to successful engagement with the tasks and for accurate data collection."
      activityEstimatedTimeSeconds={5}
      activityComplete={training.hasCompletedCameraCheck}
      onSelectionAction={() => navigate('/cam-check')}
    />
  );
};
