import { Button, Datagrid, DateField, List, TextField, useRefresh } from 'react-admin';
import { FC } from 'react';
import { Stack } from '@mui/material';
import { downloadsControllerCreate } from '../../client';

export const DownloadsList: FC = () => {
  const refresh = useRefresh();

  const handleDownloadRequest = async () => {
    const downloadResponse = await downloadsControllerCreate();

    if (downloadResponse.error || !downloadResponse.data) {
      console.error(downloadResponse.error);
      alert('Failed to make a download request')
      return;
    }

    alert('Download in progress');
    refresh();
  };

  return(
    <Stack direction="column" sx={{ alignContent: 'center', alignItems: 'center' }}>
      <Button onClick={handleDownloadRequest} variant='contained' sx={{ maxWidth: 300 }}>Request Download</Button>
      <List>
        <Datagrid>
          <TextField source='id' />
          <TextField source='status' />
          <DateField source='createdAt' />
        </Datagrid>
      </List>
    </Stack>
  );
};
