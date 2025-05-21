import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography, DialogActions } from '@mui/material';
import { FC, useState } from 'react';
import { VideoRecord } from './VideoRecord.component';
import { useNavigate } from 'react-router';
import { PractiveTaskInstructionsSide } from './PracticeTaskInstructionsSide.component';
import { useUser } from '../contexts/User.context';
import { usersControllerMarkTrainingComplete } from '../client';
import { useTraining } from '../contexts/Training.contenxt';

export const PracticeTaskRecording: FC = () => {
  const navigate = useNavigate();
  const [instructionsOpen, setInstructionsOpen] = useState<boolean>(false);
  const { user } = useUser();
  const { markCompletedTraining } = useTraining();

  const handleVideoComplete = async (_blobURL: string, _blob: Blob) => {
    const trainingCompleteResult = await usersControllerMarkTrainingComplete({
      path: {
        id: user!.id
      }
    });

    if (trainingCompleteResult.error) {
      throw new Error('Failed to mark user training as complete');
    }

    markCompletedTraining();

    navigate('/home');
  };

  return (
    <Stack direction="row">
      <VideoRecord
        downloadRecording={true}
        onSubmit={(blobURL, blob) => handleVideoComplete(blobURL, blob)}
        timeLimit={5 * 60}
      />
      <Stack>
        <PractiveTaskInstructionsSide />
        <Button variant='contained' onClick={() => setInstructionsOpen(!instructionsOpen)}>
          Click to See Instructions
        </Button>
      </Stack>
      <Dialog open={instructionsOpen}>
        <DialogTitle>Tutorial</DialogTitle>
        <DialogContent>
          <Typography variant='h3'>Important Information about the Buttons</Typography>
          <Typography variant='body1'>
            When you are in an actual task you will click
            a blue bar at the bottom of your screen to
            “Start Recording” when you want to progress to
            the recording page. You will automatically progress
            there as soon as the timer runs out as well. You cannot
            go back once you’ve selected “Start Recording”.
            The camera records automatically and a countdown timer begins to show you your remaining time.
          </Typography>
          <Typography variant='body1'>
            On the top of the next page you will see a
            “Submit Recording” button. This will stop recording
            your video and upload it automatically to the secure
            server. progress there as soon as the timer runs out
            as well. Only click this button once you are done with your
            task. The video will automatically submit once the timer runs out.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInstructionsOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
