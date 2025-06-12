import { Button } from 'react-admin';
import { FC } from 'react';
import { useRecordContext } from 'react-admin';

export const DownloadButton: FC<{ source: string }> = ({ source }) => {
  const record = useRecordContext();

  if (!record) {
    return null;
  }

  return <Button variant='contained' disabled={record['status'] != 'COMPLETE'}>Download</Button>
};
