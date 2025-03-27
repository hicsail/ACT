import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { config } from "../config/configuration";
import { isSilentSigninRequired, SilentSignin } from "casdoor-react-sdk";
import { CasdoorSDK } from "../services/casdoor.service";

export const Landing: FC = () => {
  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  console.log(isSilentSigninRequired());

  if (isSilentSigninRequired()) {
    return (
      <SilentSignin
        sdk={CasdoorSDK}
        isLoggedIn={isLoggedIn}
        handleReceivedSilentSigninSuccessEvent={() => {
          // jump to the home page here and clear silentSignin parameter
          window.location.href = "/";
        }}
        handleReceivedSilentSigninFailureEvent={() => {
          // prompt the user to log in failed here
          alert("login failed");
        }}
      />
    );
  }

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h1">
        Welcome to the Performance Task Site!
      </Typography>
      <Typography variant="body1">
        When you are ready, please login below
      </Typography>

      <Button variant="contained" href={config.casdoor.loginURL}>
        Login
      </Button>

      <Typography variant="body1">
        Please reach out to the SimSE Research Team, if you have any questions
        or concerns about the study at teachsimlab@gmail.com. The study has been
        approved by the University of of Virginia Institutional Review Board
        (UVA IRB-SBS #2170).
      </Typography>

      <Typography variant="body2">
        This site is being developed by a collaborative team of researchers from
        Boston University and University of Virginia with teacher candidates
        from University of Delaware and James Madison University.
      </Typography>
    </Stack>
  );
};
