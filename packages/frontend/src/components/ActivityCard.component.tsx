import { FC } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { AccessTime, CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material';
import { TimeDisplay } from './TimeDisplay.component';

export interface ActivityCardProps {
  previewImage: string;
  activityTitle: string;
  activityDescription: string;
  activityEstimatedTimeSeconds: number;
  activityComplete: boolean;
  onSelectionAction: () => void;
}

export const ActivityCard: FC<ActivityCardProps> = (props) => {
  return (
    <Grid container>
      <Grid size={4}>
        <img src={props.previewImage} width="100%" />
      </Grid>

      <Grid size={8}>
        <Stack spacing={2}>
          <Typography variant="h3">{props.activityTitle}</Typography>
          <Typography variant="body1">{props.activityDescription}</Typography>

          <Stack direction="row" alignItems="center">
            <Stack direction="row" sx={{ flex: 1 }} alignItems="center" gap={1}>
              <AccessTime />
              <TimeDisplay seconds={props.activityEstimatedTimeSeconds} />
            </Stack>
            <Button variant="contained" onClick={props.onSelectionAction}>
              {props.activityComplete ? 'Retake' : 'Start'}
            </Button>
          </Stack>

          {props.activityComplete ? <CompleteStatus /> : <IncompleteStatus />}
        </Stack>
      </Grid>
    </Grid>
  );
};

const CompleteStatus: FC = () => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <CheckBoxOutlined />
      <Typography variant="body1">Completed</Typography>
    </Stack>
  );
};

const IncompleteStatus: FC = () => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <CheckBoxOutlineBlank />
      <Typography variant="body1">Not Completed</Typography>
    </Stack>
  );
};
