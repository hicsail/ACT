import { Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { TaskEntity, tasksControllerGetActiveTasks } from '../client';
import { ActivityCard } from './ActivityCard.component';
import taskPreviewImage from '../assets/TaskPreviewImage.png';

export const TaskList: FC = () => {
  const [taskList, setTaskList] = useState<TaskEntity[]>([]);

  const getActiveTasks = async () => {
    const taskResponse = await tasksControllerGetActiveTasks();

    if (taskResponse.error || !taskResponse.data) {
      // TODO: Error handling
      return;
    }
    setTaskList(taskResponse.data);

  };

  useEffect(() => {
    getActiveTasks();
  }, []);

  return (
    <Stack>
      {taskList.map((task) => (
        <ActivityCard
          previewImage={taskPreviewImage}
          activityTitle={task.title}
          activityDescription={task.preview}
          activityEstimatedTime={task.timeSeconds + ''}
          activityComplete={false}
          onSelectionAction={() => console.log('hi :)')}
        />
      ))}
    </Stack>
  );
}
