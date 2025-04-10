import { FC } from 'react';
import { Button, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { TaskEntity } from '../client';

export interface TaskInstructionsProps {
  task: TaskEntity;
  onStart: () => void;
}

export const TaskInstructions: FC<TaskInstructionsProps> = ({ task, onStart }) => {
  return (
    <Stack>
      <Typography variant="h1">{task.title}</Typography>
      <Typography variant="body1">{task.description}</Typography>
      <Typography variant="h3">The problem you have chosen is:</Typography>
      <Typography variant="body1">{task.problemDescription}</Typography>
      <Typography variant="h3">Your task is to do the following:</Typography>
      <Typography variant="body1">{task.taskDetails}</Typography>
      <Typography variant="h3">Remember to:</Typography>
      <List sx={{ listStyleType: 'disc' }}>
        {(task.prompts as any).map((txt: string, index: number) => (<ListItem key={index} sx={{ display: 'list-item' }}><ListItemText>{txt}</ListItemText></ListItem>))}
      </List>
      <Typography variant="body1">TODO: Task breakdown</Typography>
      <Button variant="contained" onClick={onStart}>
        Start Recording
      </Button>
    </Stack>
  );
};
