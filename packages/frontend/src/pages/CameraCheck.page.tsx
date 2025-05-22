import { FormControl, FormControlLabel, RadioGroup, Stack, Typography, Radio, Button } from '@mui/material';
import { FC, useState } from 'react';
import { VideoRecord } from '../components/VideoRecord.component';
import { useNavigate } from 'react-router';
import { useTraining } from '../contexts/Training.contenxt';
import { ResolvePermissionError } from '../components/ResolvePermissionError.component';

export const CameraCheck: FC = () => {
  const [isComplete, setIsComplete] = useState<boolean>(false);

  return (
    <Stack spacing={3}>
      <VideoRecord downloadRecording={true} onRecordingStop={(_blobURL, _blob) => setIsComplete(true)} timeLimit={5} />

      <Typography variant="body2">
        Please do not use wireless headphones in the recording of these tasks, as they cause audio delays. If you
        experience audio delays for other reasons, but are still able to complete the tasks, we will accept those
        videos.
      </Typography>

      {isComplete && <CompletionForm />}
    </Stack>
  );
};

const CompletionForm: FC = () => {
  const [issueFound, setIssueFound] = useState<boolean>(false);
  const navigate = useNavigate();
  const training = useTraining();

  const handleFinishClick = () => {
    if (issueFound) {
      window.location.reload();
    } else {
      training.markCameraCheckComplete();
      navigate('/home');
    }
  };

  return (
    <Stack>
      <FormControl>
        <RadioGroup value={issueFound} onChange={(event, _checked) => setIssueFound(event.target.value == 'true')}>
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="By checking this box I confirm that I watched my downloaded video and there are no issues: my video captured my image and the audio. "
          />
          <FormControlLabel
            value={true}
            control={<Radio />}
            label="There were issues with my video and/or audio that I could not solve."
          />
        </RadioGroup>
      </FormControl>

      <Button variant="contained" onClick={handleFinishClick}>
        {issueFound ? 'Refresh and Retake' : 'Finish'}
      </Button>
      {issueFound && <ResolvePermissionError />}
    </Stack>
  );
};
