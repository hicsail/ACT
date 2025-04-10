import { Stack } from '@mui/material';
import { FC } from 'react';
import { VideoRecord } from './VideoRecord.component';
import { TaskInstructionsSide } from './TaskInstructionsSide.component';

export const TaskRecording: FC = () => {
  const handleVideoComplete = async (blobURL: string) => {

  };

  return (
    <Stack direction='row'>
      <VideoRecord
        downloadRecording={false}
        onRecordingStop={(blobURL) => handleVideoComplete(blobURL)}
        timeLimit={5}
      />

      <TaskInstructionsSide />
    </Stack>
  );
};
