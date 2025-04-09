import { ActivityCard } from './ActivityCard.component';
import { useState, FC, useEffect } from 'react';
import { TaskEntity, TaskCompletionEntity, taskCompletionsControllerFindOrCreateByTask } from '../client';
import taskPreviewImage from '../assets/TaskPreviewImage.png';

export interface TaskActivityProps {
  task: TaskEntity;
}

export const TaskActivity: FC<TaskActivityProps> = ({ task }) => {
  const [taskCompletion, setTaskCompletion] = useState<TaskCompletionEntity | null>(null);

  const getTaskCompletion = async () => {
    const taskCompletionResult = await taskCompletionsControllerFindOrCreateByTask({
      query: {
        task: task.id
      }
    });

    if (taskCompletionResult.error || !taskCompletionResult.data) {
      // TODO: Handle error
      return;
    }

    setTaskCompletion(taskCompletionResult.data);
  };

  useEffect(() => {
    getTaskCompletion();
  }, []);

  return (
    <ActivityCard
      previewImage={taskPreviewImage}
      activityTitle={task.title}
      activityDescription={task.preview}
      activityEstimatedTimeSeconds={task.timeSeconds}
      activityComplete={taskCompletion ? taskCompletion.complete : false}
      onSelectionAction={() => console.log('hi :)')}
    />
  );
};
