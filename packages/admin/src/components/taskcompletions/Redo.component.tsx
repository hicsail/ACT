import { useRecordContext, useRefresh } from 'react-admin';
import { FC } from 'react';
import { Button } from '@mui/material';
import { taskCompletionsControllerUpdate } from '../../client';


export const Redo: FC = () => {
  const refresh = useRefresh();

  const record = useRecordContext();
  if (!record) {
    return null;
  }

  const handleRedo = async () => {
    // Make the request to mark the completion as incomplete
    const updateResponse = await taskCompletionsControllerUpdate({
      query: {
        taskId: record['taskId'],
        userId: record['userId']
      },
      body: {
        complete: false
      }
    });

    // Check for errors
    if (updateResponse.error) {
      // TODO: Handle erorr
      console.error(updateResponse.error);
    }

    // Update the page
    refresh();
  };

  return (
    <Button variant='contained' disabled={!record['complete']} onClick={handleRedo}>Redo</Button>
  );
};
