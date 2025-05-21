import { Stack, Typography, List } from '@mui/material';
import { FC } from 'react';

export const PractiveTaskInstructionsSide: FC = () => {
  return (
    <Stack>
      <Typography variant="h3">The problem you have chosen is:</Typography>
      <Typography variant="body1">You are going to model one-fourth with a rectangle</Typography>
      <Typography variant="h3">Your task is to do the following:</Typography>
      <Typography variant="body1">
        Model how to represent one-fourth with this rectangular shape.
        Use concise and precise mathematical language.
      </Typography>
      <Typography variant="h3">Remember to:</Typography>
      <List sx={{ listStyleType: 'disc' }}>
        Model how to represent one-fourth with a rectangle.
        Use concise and precise mathematical language.
      </List>
    </Stack>
  );
};
