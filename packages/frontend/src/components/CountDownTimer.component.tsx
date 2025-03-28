import { Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";

export type CountDownState = 'running' | 'paused' | 'idle';

export interface CountDownTimerProps {
  seconds: number;
  status: 'running' | 'paused' | 'idle';
}

export const CountDownTimer: FC<CountDownTimerProps> = ({ seconds, status }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(seconds);
  const [timeString, setTimeString] = useState<string>('00:00');

  const updateTimeString = (seconds: number) => {
    const minutesRemaining = Math.floor(seconds / 60);
    const secondsRemaining = seconds - (minutesRemaining * 60);

    const minutesString = minutesRemaining.toString().padStart(2, "0")
    const secondsString = secondsRemaining.toString().padStart(2, "0");

    setTimeString(`${minutesString}:${secondsString}`);
  };

  const tick = () => {
    console.log(timeRemaining);
    if (timeRemaining <= 0 || status == 'paused') {
      return;
    }

    if (status == 'idle') {
      setTimeRemaining(seconds);
      return;
    }

    const newRemaining = timeRemaining - 1;
    updateTimeString(newRemaining);
    setTimeRemaining(newRemaining);
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  useEffect(() => {
    updateTimeString(seconds);
  }, []);

  return (
      <Typography variant="body1">{timeString}</Typography>
  );
};

export default CountDownTimer;
