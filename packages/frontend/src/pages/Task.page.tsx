import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { TaskCompletionEntity, TaskEntity } from '../client';
import { TaskInstructions } from '../components/task/TaskInstructions.component';
import { TaskRecording } from '../components/task/TaskRecording.component';

export const Task: FC = () => {
  const { state } = useLocation();
  const [taskCompletion, setTaskCompletion] = useState<TaskCompletionEntity | null>(null);
  const [task, setTask] = useState<TaskEntity | null>(null);
  const [view, setView] = useState<'instructions' | 'recording'>('instructions');

  useEffect(() => {
    setTaskCompletion(state.taskCompletion);
    setTask(state.task);
  }, []);

  return (
    <>
      {task && view == 'instructions' && <TaskInstructions task={task} onStart={() => setView('recording')} />}
      {task && taskCompletion && view == 'recording' && <TaskRecording task={task} taskCompletion={taskCompletion} />}
    </>
  );
};
