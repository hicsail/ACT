import { useRecordContext } from 'react-admin';
import { FC } from 'react';


export const VideoField: FC<{ source: string}> = ({ source }) => {
  const record = useRecordContext();

  if (!record) {
    return null;
  }

  return <p>hi</p>;
};
