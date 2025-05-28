import { FC } from 'react';
import { Box, Button, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { TaskEntity } from '../../client';

export interface TaskInstructionsProps {
  task: TaskEntity;
  onStart: () => void;
}

export const TaskInstructions: FC<TaskInstructionsProps> = ({ task, onStart }) => {
  console.log(task);

  return (
    <Stack sx={{ padding: 10 }}>
      <Typography variant="h1">{task.title}</Typography>
      <Typography variant="body1">{task.description}</Typography>

      <Typography variant="h3" sx={{ paddingTop: 10 }}>
        The problem is:
      </Typography>
      <Typography variant="body1">{task.problemDescription}</Typography>

      {task.contentImage && <Box component="img" sx={{ maxWidth: 300 }} src={task.contentImage} />}

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
      <Button variant="contained" onClick={onStart}>
        Start Recording
      </Button>
    </Stack>
  );
};
