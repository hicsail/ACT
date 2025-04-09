import { Button, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { config } from '../config/configuration';
import { useNavigate } from 'react-router';
import { useUser } from '../contexts/User.context';

export const Landing: FC = () => {
  const { user } = useUser();

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h1">Welcome to the Performance Task Site!</Typography>

      {user ? <UserContent /> : <LoginContent />}

      <Typography variant="body1">
        Please reach out to the SimSE Research Team, if you have any questions or concerns about the study at
        teachsimlab@gmail.com. The study has been approved by the University of of Virginia Institutional Review Board
        (UVA IRB-SBS #2170).
      </Typography>

      <Typography variant="body2">
        This site is being developed by a collaborative team of researchers from Boston University and University of
        Virginia with teacher candidates from University of Delaware and James Madison University.
      </Typography>
    </Stack>
  );
};

// Content shown to a person that needs to login
const LoginContent: FC = () => {
  const [loginURL, setLoginURL] = useState<string | null>(null);

  const getAuthURL = async () => {
    const result = await fetch(`${config.backendURL}/casdoor/redirect`);
    const body = await result.json();
    setLoginURL(body.url);
  };

  useEffect(() => {
    getAuthURL();
  }, []);

  return (
    <>
      <Typography variant="body1">When you are ready, please login below</Typography>

      {loginURL && (
        <Button variant="contained" href={loginURL}>
          Login
        </Button>
      )}
    </>
  );
};

// Content shown to someone who is already logged in
const UserContent: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="body1">When you are ready, please click the link below</Typography>

      <Button variant="contained" onClick={() => navigate('/home')}>
        Home
      </Button>
    </>
  );
};
