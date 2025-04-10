import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const TaskInstructionsSide: FC = () => {
  return (
    <Stack>
      <Typography variant="h3">The problem you have chosen is:</Typography>
      <Typography variant="body1">TODO: Add problem description</Typography>
      <Typography variant="h3">Your task is to do the following:</Typography>
      <Typography variant="body1">TODO: Provide task details</Typography>
      <Typography variant="h3">Remember to:</Typography>
      <Typography variant="body1">TODO: Task breakdown</Typography>
    </Stack>
  );
};
