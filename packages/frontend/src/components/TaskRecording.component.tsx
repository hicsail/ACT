import { Stack } from '@mui/material';
import { FC } from 'react';
import { VideoRecord } from './VideoRecord.component';
import { TaskInstructionsSide } from './TaskInstructionsSide.component';
import {
  TaskCompletionEntity,
  taskCompletionsControllerGetVideoUploadUrl,
  taskCompletionsControllerUpdate,
  TaskEntity
} from '../client';

export interface TaskRecordingProps {
  task: TaskEntity;
  taskCompletion: TaskCompletionEntity;
}

export const TaskRecording: FC<TaskRecordingProps> = ({ task, taskCompletion }) => {
  const handleVideoComplete = async (_blobURL: string, blob: Blob) => {
    // Get link to upload the video
    const uploadUrlResult = await taskCompletionsControllerGetVideoUploadUrl({
      path: {
        id: taskCompletion.id
      }
    });

    if (uploadUrlResult.error || !uploadUrlResult.data) {
      // TODO: Handle error
      console.error(uploadUrlResult.error);
      return;
    }

    // Upload the video
    const result = await fetch(uploadUrlResult.data, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': 'video/mp4'
      }
    });

    // Check result
    if (!result.ok) {
      console.error(`Failed to upload video`);
      return;
    }

    // Mark as complete
    const updateResult = await taskCompletionsControllerUpdate({
      path: { id: taskCompletion.id },
      body: { complete: true }
    });

    if (updateResult.error) {
      console.error('Failed to mark as finished');
    }
  };

  return (
    <Stack direction="row">
      <VideoRecord
        downloadRecording={false}
        onRecordingStop={(blobURL, blob) => handleVideoComplete(blobURL, blob)}
        timeLimit={5}
      />

      <TaskInstructionsSide />
    </Stack>
  );
};
