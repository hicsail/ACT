import { useRecordContext } from 'react-admin';
import { FC } from 'react';


export const VideoField: FC<{ source: string}> = ({ source }) => {
  const record = useRecordContext();

  if (!record) {
    return null;
  }
  console.log(record[source]);

  return <p>hi</p>;
};
