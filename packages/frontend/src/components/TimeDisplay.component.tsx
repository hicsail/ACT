import { FC } from 'react';
import { Typography } from '@mui/material';

export interface TimeDisplayProps {
  seconds: number;
}

export const TimeDisplay: FC<TimeDisplayProps> = ({ seconds }) => {
  const minutesRemaining = Math.floor(seconds / 60);
  const secondsRemaining = seconds - minutesRemaining * 60;

  const minutesString = minutesRemaining.toString().padStart(2, '0');
  const secondsString = secondsRemaining.toString().padStart(2, '0');

  const timeString = `${minutesString}:${secondsString}`;

  return <Typography variant="body1">{timeString}</Typography>;
};
