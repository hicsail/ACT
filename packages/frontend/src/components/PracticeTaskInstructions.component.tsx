import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Stack,
  Typography,
  ListItemText,
  DialogActions
} from '@mui/material';

export interface PracticeTaskInstructionsProps {
  onContinue: () => void;
}

export const PracticeTaskInstructions: FC<PracticeTaskInstructionsProps> = ({ onContinue }) => {
  const [instructionsOpen, setInstructionsOpen] = useState<boolean>(false);

  return (
    <Stack>
      <Typography variant="h1">Practice Task: Model Fractions</Typography>
      <Typography variant="body1">
        You are introducing models of fractions for your 3rd grade class. You have modeled one-half, now you are moving
        to fourths.You are going to model one-fourth with a rectangle
      </Typography>
      <Typography variant="h3">Your task is to do the following:</Typography>
      <Typography variant="body1">
        Model how to represent one-fourth with this rectangular shape. Use concise and precise mathematical language.
      </Typography>
      <Typography variant="h3">Note</Typography>
      <Typography variant="body1">
        -You are speaking to your class the entire time. -You may use visual (whiteboard, paper, etc.) and hold it up in
        bold, clear view to your camera.
      </Typography>
      <Button variant="contained" onClick={onContinue}>Continue Tutorial</Button>
      <Button variant="contained" onClick={() => setInstructionsOpen(!instructionsOpen)}>
        Click to See Instructions
      </Button>
      <Dialog open={instructionsOpen}>
        <DialogTitle>Tutorial</DialogTitle>
        <DialogContent>
          <InstructionsContent />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInstructionsOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

const InstructionsContent: FC = () => {
  return (
    <Stack>
      <List component="ol">
        <ListItem>
          <ListItemText>
            1. This is the directions page. Notice the timer on this page. You have a limited amount of time to view the
            directions before you are asked to enact the task.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            2. When the timer runs out or when When you have finished your task (and have clicked “Submit Recording”) or
            when the timer runs out, the video will on this page.Reminder: During task the blue bar will advance you to
            the recording screen, only click it when you are ready to record. You cannot go back.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            3. On the next screen you will have to give permission to use your camera microphone.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            4. When you have finished your task (and have clicked “Submit Recording”) or when the timer runs out, the
            video will automatically upload to a secure server (when completing an actual task.)
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            5. For the purpose of the tutorial, your video will download to your computer instead of uploading to the
            secure server. This is for you to check the quality of your video prior to beginning an actual task. Reach
            out to teachsimlab@gmail.com if you have any issues you cannot resolve with your tutorial task video.
          </ListItemText>
        </ListItem>
      </List>
    </Stack>
  );
};
