import { Stack } from '@mui/material';
import { FC, ChangeEvent } from 'react';
import { Button, Datagrid, List, TextField, useRefresh } from 'react-admin';
import { config } from '../../config/configuration';
import { JWT_TOKEN_KEY } from '../../auth';

export const StudyMappingList: FC = () => {
  const refresh = useRefresh();

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem(JWT_TOKEN_KEY);
    if (!token) {
      throw Error('Cannot upload without token');
    }

    await fetch(`${config.backendURL}/studymapping/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    refresh();
  };

  return (
    <Stack direction="column" sx={{ alignContent: 'center', alignItems: 'center' }}>
      <Button variant="contained" sx={{ maxWidth: 300 }} component="label">
        Upload Study Mappings
        <input hidden accept=".csv" multiple type="file" onChange={handleFileUpload} />
      </Button>
      <List>
        <Datagrid>
          <TextField source="email" />
          <TextField source="studyId" />
          <TextField source="region" />
        </Datagrid>
      </List>
    </Stack>
  );
};
