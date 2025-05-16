import { Divider, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { CameraCheckActivity } from '../components/CameraCheckActivity.component';
import { TaskList } from '../components/TaskList.component';
import { useTraining } from '../contexts/Training.contenxt';

export const Home: FC = () => {
  const training = useTraining();

  return (
    <>
      <Stack spacing={3} sx={{ textAlign: 'center', padding: 3 }}>
        <Typography variant="body1">
          Thank you for supporting our research by completing these tasks! Please refer to your emailed instructions to
          ensure you know which four tasks from the list below are required. You will not complete all of the tasks on
          this page. You also may not be completing the tasks in numerical order.
        </Typography>

        <Typography variant="body1">
          Failure to complete assigned tasks could result in delayed compensation and additional work required. If you
          have any questions, reach out to Lindsey McLean Don't forget to use this tip sheet to supporting your tasks.
          Review this before you enter the tasks as the timer will begin immediately.
        </Typography>

        <Typography variant="h2">Demonstrate your skills through the assigned tasks below.</Typography>

        <Typography variant="body1">
          Note: Your camera and audio will be recording for the tutorial and tasks. We suggest you are in a quiet room
          where you can give attention to and have few distractions from the tasks.
        </Typography>

        <Typography variant="body1">
          For videos to save correctly, you must use your desktop and we recommend the Google Chrome browser. Using a
          mobile device or other browsers may cause errors or data loss.
        </Typography>

        <Divider variant="middle" sx={{ borderColor: 'black' }} />

        <CameraCheckActivity />

        {training.hasCompletedCameraCheck && <TaskList />}
      </Stack>
    </>
  );
};
