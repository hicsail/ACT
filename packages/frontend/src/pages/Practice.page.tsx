import { FC, useState } from 'react';
import { PracticeTaskInstructions } from '../components/PracticeTaskInstructions.component';


export const PracticeTask: FC = () => {
  const [view, setView] = useState<'instructions' | 'recording'>('instructions');

  return (
    <>
      {view == 'instructions' && <PracticeTaskInstructions />}
    </>
  );
};
