import { Stack, Typography, List, ListItemText, ListItem } from '@mui/material';
import { FC } from 'react';

export const PractiveTaskInstructionsSide: FC = () => {
  return (
    <Stack>
      <Typography variant="h3">The problem you have chosen is:</Typography>
      <Typography variant="body1">You are going to model one-fourth with a rectangle</Typography>

      <Typography variant="h3" sx={{ paddingTop: 10 }}>Your task is to do the following:</Typography>
      <Typography variant="body1">
        Model how to represent one-fourth with this rectangular shape. Use concise and precise mathematical language.
      </Typography>

      <Typography variant="h3" sx={{ paddingTop: 10 }}>Remember to:</Typography>
      <List sx={{ listStyleType: 'disc' }}>

      </List>

      <List sx={{ listStyleType: 'disc' }}>
        <ListItem sx={{ display: 'list-item' }}>
          <ListItemText>Model how to represent one-fourth with a rectangle.</ListItemText>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <ListItemText>
            Use concise and precise mathematical language.
          </ListItemText>
        </ListItem>
      </List>
    </Stack>
  );
};
