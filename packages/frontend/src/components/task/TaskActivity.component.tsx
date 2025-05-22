import { ActivityCard } from '../ActivityCard.component';
import { FC } from 'react';
import { TaskEntity, TaskCompletionEntity } from '../../client';
import taskPreviewImage from '../../assets/TaskPreviewImage.png';
import { useNavigate } from 'react-router';

export interface TaskActivityProps {
  task: TaskEntity;
  taskCompletion: TaskCompletionEntity;
}

export const TaskActivity: FC<TaskActivityProps> = ({ task, taskCompletion }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!taskCompletion) {
      throw new Error(`Cannot navigate to the task completion, no task prescent`);
    }
    navigate(`/taskcompletion`, { state: { taskCompletion, task } });
  };

  return (
    <ActivityCard
      previewImage={taskPreviewImage}
      activityTitle={task.title}
      activityDescription={task.preview}
      activityEstimatedTimeSeconds={task.timeSeconds}
      activityComplete={taskCompletion ? taskCompletion.complete : false}
      onSelectionAction={() => handleNavigate()}
    />
  );
};
