import { FC } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { AccessTime, CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material';

export interface ActivityCardProps {
  previewImage: string;
  activityTitle: string;
  activityDescription: string;
  activityEstimatedTime: string;
  activityComplete: boolean;
}

export const ActivityCard: FC<ActivityCardProps> = (props) => {
  return (
    <Grid container>
      <Grid size={4}>
        <img src={props.previewImage} width="100%" />
      </Grid>

      <Grid size={8}>
        <Stack spacing={2}>
          <Typography variant='h3'>{props.activityTitle}</Typography>
          <Typography variant='body1'>{props.activityDescription}</Typography>

          <Stack direction='row' alignItems='center'>
            <Stack direction='row' sx={{ flex: 1 }} alignItems='center' gap={1}>
              <AccessTime />
              <Typography variant='body1'>{props.activityEstimatedTime}</Typography>
            </Stack>
            <Button variant='contained'>{props.activityComplete ? 'Retake' : 'Start'}</Button>
          </Stack>

          {props.activityComplete ? <CompleteStatus /> : <IncompleteStatus />}
        </Stack>
      </Grid>
    </Grid>
  );
};

const CompleteStatus: FC = () => {
  return (
    <Stack direction='row' alignItems='center' gap={1}>
      <CheckBoxOutlined />
      <Typography variant='body1'>Completed</Typography>
    </Stack>
  );
};

const IncompleteStatus: FC = () => {
  return (
    <Stack direction='row' alignItems='center' gap={1}>
      <CheckBoxOutlineBlank />
      <Typography variant='body1'>Not Completed</Typography>
    </Stack>
  )
};
