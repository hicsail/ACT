import { FC, useEffect, useState } from 'react';
import { TaskCompletionEntity, taskCompletionsControllerGetNextIncomplete, TaskEntity, tasksControllerFindOne } from '../client';
import { TaskActivity } from './TaskActivity.component';

export const TaskList: FC = () => {
  const [task, setTask] = useState<TaskEntity | null>(null);
  const [taskCompletion, setTaskCompletion] = useState<TaskCompletionEntity | null>(null);

  const getActiveTasks = async () => {
    // Get the next incomplete task completion
    const taskCompletionResponse = await taskCompletionsControllerGetNextIncomplete();
    if (taskCompletionResponse.response.status == 404) {
      // TODO: Handle no more tasks
      return;
    }
    if (taskCompletionResponse.error || !taskCompletionResponse.data) {
      // TODO: Error handling
      return;
    }
    const taskCompletion = taskCompletionResponse.data;

    // Now get the cooresponding task
    const taskResponse = await tasksControllerFindOne({
      path: { id: taskCompletion.taskId }
    });
    if (taskResponse.error || !taskResponse.data) {
      // TODO: Handle error
      return;
    }

    console.log(taskCompletion);

    // Now update the fields
    setTask(taskResponse.data);
    setTaskCompletion(taskCompletionResponse.data);
  };

  useEffect(() => {
    getActiveTasks();
  }, []);

  return (
    <>
      {task && taskCompletion && <TaskActivity task={task} taskCompletion={taskCompletion} key={task.id} /> }
    </>
  );
};
