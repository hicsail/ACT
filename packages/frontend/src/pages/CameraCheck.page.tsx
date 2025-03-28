import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { VideoRecord } from '../components/VideoRecord.component';


export const CameraCheck: FC = () => {

  return (
    <Stack spacing={3}>
      <VideoRecord />

      <Typography variant='body2'>
        Please do not use wireless headphones in the recording of these tasks, as they cause audio delays.
        If you experience audio delays for other reasons, but are still able to complete the tasks, we will accept those videos.
      </Typography>
    </Stack>
  );
};
