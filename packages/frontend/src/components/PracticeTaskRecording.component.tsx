import { Stack } from '@mui/material';
import { FC } from 'react';
import { VideoRecord } from './VideoRecord.component';
import { useNavigate } from 'react-router';
import { PractiveTaskInstructionsSide } from './PracticeTaskInstructionsSide.component';

export const PracticeTaskRecording: FC = () => {
  const navigate = useNavigate();

  const handleVideoComplete = async (_blobURL: string, blob: Blob) => {
    navigate('/home');
  };

  return (
    <Stack direction="row">
      <VideoRecord
        downloadRecording={true}
        onSubmit={(blobURL, blob) => handleVideoComplete(blobURL, blob)}
        timeLimit={5 * 60}
      />

      <PractiveTaskInstructionsSide />
    </Stack>
  );
};
