import { Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { TaskEntity, tasksControllerGetActiveTasks } from '../client';
import { TaskActivity } from './TaskActivity.component';

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
        <TaskActivity task={task} key={task.id} />
      ))}
    </Stack>
  );
};
