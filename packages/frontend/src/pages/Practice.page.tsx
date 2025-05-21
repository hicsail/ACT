import { FC, useState } from 'react';
import { PracticeTaskInstructions } from '../components/PracticeTaskInstructions.component';
import { PracticeTaskRecording } from '../components/PracticeTaskRecording.component';

export const PracticeTask: FC = () => {
  const [view, setView] = useState<'instructions' | 'recording'>('instructions');

  return (
    <>
      {view == 'instructions' && <PracticeTaskInstructions onContinue={() => setView('recording')} />}
      {view == 'recording' && <PracticeTaskRecording />}
    </>
  );
};
