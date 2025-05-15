import { FC, useState, useEffect } from 'react';
import { TimeDisplay } from './TimeDisplay.component';

export type CountDownState = 'running' | 'paused' | 'restart';

export interface CountDownTimerProps {
  seconds: number;
  status: CountDownState;
}

export const CountDownTimer: FC<CountDownTimerProps> = ({ seconds, status }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(seconds);

  useEffect(() => {
    if (status == 'restart') {
      setTimeRemaining(seconds);
      return;
    }
  }, [status]);

  const tick = () => {
    if (timeRemaining <= 0 || status != 'running') {
      return;
    }

    if (status == 'running') {
      const newRemaining = timeRemaining - 1;
      setTimeRemaining(newRemaining);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return <TimeDisplay seconds={timeRemaining} />;
};

export default CountDownTimer;
