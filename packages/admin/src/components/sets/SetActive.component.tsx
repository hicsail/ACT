import { Button } from '@mui/material';
import { FC } from 'react';
import { useRecordContext, useRefresh } from 'react-admin';
import { taskSetControllerSetActive } from '../../client';

export const SetActive: FC = () => {
  const refresh = useRefresh();

  const record = useRecordContext();
  if (!record) {
    return null;
  }

  const handleSetActive = async () => {
    const result = await taskSetControllerSetActive({
      path: {
        id: record['id'] as string
      }
    });

    if (result.error) {
      // TODO: Handle error
      console.error(result.error);
    }

    refresh();
  };

  return (
    <Button variant="contained" disabled={record['active']} onClick={handleSetActive}>
      Set Active
    </Button>
  );
};
