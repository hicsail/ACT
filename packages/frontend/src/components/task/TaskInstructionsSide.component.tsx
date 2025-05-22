import { Stack, Typography, List, ListItem, ListItemText } from '@mui/material';
import { FC } from 'react';
import { TaskEntity } from '../../client';

export interface TaskInstructionsSideProps {
  task: TaskEntity;
}

export const TaskInstructionsSide: FC<TaskInstructionsSideProps> = ({ task }) => {
  return (
    <Stack>
      <Typography variant="h3">The problem you have chosen is:</Typography>
      <Typography variant="body1">{task.problemDescription}</Typography>

      <Typography variant="h3" sx={{ paddingTop: 10 }}>
        Your task is to do the following:
      </Typography>
      <Typography variant="body1">{task.taskDetails}</Typography>

      <Typography variant="h3" sx={{ paddingTop: 5 }}>
        Remember to:
      </Typography>
      <List sx={{ listStyleType: 'disc' }}>
        {(task.prompts as any).map((txt: string, index: number) => (
          <ListItem key={index} sx={{ display: 'list-item' }}>
            <ListItemText>{txt}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
