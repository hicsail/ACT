import { FormControl, FormControlLabel, RadioGroup, Stack, Typography, Radio, Button, Link } from '@mui/material';
import { FC, useState } from 'react';
import { VideoRecord } from '../components/VideoRecord.component';
import { config } from '../config/configuration';
import { useNavigate } from 'react-router';

export const CameraCheck: FC = () => {
  const [isComplete, setIsComplete] = useState<boolean>(false);

  return (
    <Stack spacing={3}>
      <VideoRecord downloadRecording={true} onRecordingStop={(_blobURL) => setIsComplete(true)} />

      <Typography variant='body2'>
        Please do not use wireless headphones in the recording of these tasks,
        as they cause audio delays. If you experience audio delays for other
        reasons, but are still able to complete the tasks, we will accept those
        videos.
      </Typography>

      {isComplete && <CompletionForm />}
    </Stack>
  );
};

const CompletionForm: FC = () => {
  const [issueFound, setIssueFound] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleFinishClick = () => {
    if (issueFound) {
      window.location.reload();
    } else {
      // TODO: Save results
      navigate('/home');
    }
  }

  return (
    <Stack>
      <FormControl>
        <RadioGroup value={issueFound} onChange={(_, checked) => setIssueFound(checked as any)}>
          <FormControlLabel
            value={false}
            control={<Radio />}
            label='By checking this box I confirm that I watched my downloaded video and there are no issues: my video captured my image and the audio. '
          />
          <FormControlLabel
            value={true}
            control={<Radio />}
            label='There were issues with my video and/or audio that I could not solve.'
          />
        </RadioGroup>
      </FormControl>

      <Button variant='contained' onClick={handleFinishClick}>{issueFound ? 'Refresh and Retake' : 'Finish'}</Button>

      {issueFound && <ResolvePermissionError />}

    </Stack>
  );
};

const ResolvePermissionError: FC = () => {
  return (
    <Stack spacing={3}>
      <Typography>
        Check out the following resources to resolve permission issues you may
        be having;{" "}
      </Typography>
      <Stack spacing={1}>
        <Link
          variant="body2"
          href="https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DDesktop&oco=0"
          target="_blank"
          rel="noopener"
        >
          Enable camera permissions in Chrome
        </Link>
        <Link
          variant="body2"
          href="https://support.apple.com/guide/safari/websites-ibrwe2159f50/mac"
          target="_blank"
          rel="noopener"
        >
          Enable camera permissions in Safari
        </Link>
      </Stack>
      <Typography variant="caption">
        If you are experiencing any audio delays, please check if you are using
        any form or wireless headphones during the recording process. If you are
        not using any wireless headphones and are experiencing only audio
        delays, please continue as these videos will still be accepted.
      </Typography>
      <Typography>
        Please fill{" "}
        <Link href={config.googleFormURL} target="_blank" rel="noopener">
          this form
        </Link>{" "}
        and email{" "}
        <Typography fontWeight={800} style={{ display: "inline-block" }}>
          teachsimlab@gmail.com
        </Typography>{" "}
        if you still need help.
      </Typography>
    </Stack>
  );
}
