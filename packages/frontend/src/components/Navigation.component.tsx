import { AppBar, Toolbar, Typography, Stack } from '@mui/material';
import { FC } from 'react';


export const Navigation: FC = () => {

  return (
    <AppBar position='static'>
      <Toolbar >
        <Typography variant='h2' sx={{ display: 'flex', flexGrow: 1 }}>Teacher Tasks</Typography>

        <Stack direction='row' spacing={3}>
          <Typography variant='h3'>Home</Typography>
          <Typography variant='h3'>Enter Credentials</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
