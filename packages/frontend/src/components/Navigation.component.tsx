import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../contexts/User.context';

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const { user, logout, loginURL } = useUser();

  const loginLogoutButtonClick = () => {
    if (user) {
      logout();
    } else if(loginURL) {
      window.location.href = loginURL;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" sx={{ display: 'flex', flexGrow: 1 }}>
          Teacher Tasks
        </Typography>

        <Stack direction="row" spacing={3}>
          <Button color='inherit' onClick={() => navigate('/home')}>Home</Button>
          <Button color='inherit' onClick={() => loginLogoutButtonClick()}>{user ? 'Logout': 'Login'}</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
