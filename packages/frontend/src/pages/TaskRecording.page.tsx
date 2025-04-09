import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TaskCompletionEntity, taskCompletionsControllerFindOne, TaskEntity, tasksControllerFindOne } from '../client';
import { Stack, Typography } from '@mui/material';

export const TaskRecording: FC = () => {
  const { taskCompletionId } = useParams();
  const [taskCompletion, setTaskCompletion] = useState<TaskCompletionEntity | null>(null);
  const [task, setTask] = useState<TaskEntity | null>(null);


  const loadTaskDetails = async (taskCompletionId: string) => {
    // First get the task completion object
    const taskCompletionResponse = await taskCompletionsControllerFindOne({
      path: {
        id: taskCompletionId
      }
    });

    // Make sure the response was successful
    if (taskCompletionResponse.error || !taskCompletionResponse.data) {
      // TODO: Handle error
      console.error(`Failed to get a task completion object with id: ${taskCompletionId}`);
      return;
    }

    // Now get the task object itself
    const taskResponse = await tasksControllerFindOne({
      path: {
        id: taskCompletionResponse.data.taskId
      }
    });

    // Make sure the response was successful
    if (taskResponse.error || !taskResponse.data) {
      // TODO: Handle error
      console.error(`Failed to get task object with id: ${taskCompletionResponse.data.taskId}`);
      return;
    }

    // Set the objects
    setTaskCompletion(taskCompletionResponse.data);
    setTask(taskResponse.data);
  };

  useEffect(() => {
    if (!taskCompletionId) {
      // TODO: Handle error
      console.error(`Cannot load task view`);
      return;
    }

    loadTaskDetails(taskCompletionId);
  }, [taskCompletionId]);

  return (
    <>
      {taskCompletion && task && (
        <Stack>
          <Typography variant='h1'>{task.title}</Typography>
          <Typography variant='body1'>TODO: Task description</Typography>
          <Typography variant='h3'>The problem you have chosen is:</Typography>
          <Typography variant='body1'>TODO: Add problem description</Typography>
          <Typography variant='h3'>Your task is to do the following:</Typography>
          <Typography variant='body1'>TODO: Provide task details</Typography>
          <Typography variant='h3'>Remember to:</Typography>
          <Typography variant='body1'>TODO: Task breakdown</Typography>
        </Stack>
      )}
    </>
  );
};
