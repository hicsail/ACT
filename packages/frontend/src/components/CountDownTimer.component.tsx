import { Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";

export type CountDownState = "running" | "paused" | "restart";

export interface CountDownTimerProps {
  seconds: number;
  status: CountDownState;
}

export const CountDownTimer: FC<CountDownTimerProps> = ({
  seconds,
  status,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(seconds);
  const [timeString, setTimeString] = useState<string>("00:00");

  const updateTimeString = (seconds: number) => {
    const minutesRemaining = Math.floor(seconds / 60);
    const secondsRemaining = seconds - minutesRemaining * 60;

    const minutesString = minutesRemaining.toString().padStart(2, "0");
    const secondsString = secondsRemaining.toString().padStart(2, "0");

    setTimeString(`${minutesString}:${secondsString}`);
  };

  useEffect(() => {
    if (status == "restart") {
      setTimeRemaining(seconds);
      updateTimeString(seconds);
      return;
    }
  }, [status]);

  const tick = () => {
    if (timeRemaining <= 0 || status != "running") {
      return;
    }

    if (status == "running") {
      const newRemaining = timeRemaining - 1;
      updateTimeString(newRemaining);
      setTimeRemaining(newRemaining);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  useEffect(() => {
    updateTimeString(seconds);
  }, []);

  return <Typography variant="body1">{timeString}</Typography>;
};

export default CountDownTimer;
