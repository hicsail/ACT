import { Stack } from '@mui/material';
import { FC } from 'react';
import { Button, Datagrid, List, TextField } from 'react-admin';

export const StudyMappingList: FC = () => {

  return (
    <Stack direction='column' sx={{ alignContent: 'center', alignItems: 'center' }}>
      <Button variant='contained' sx={{ maxWidth: 300 }}>Upload Study Mappings</Button>
      <List>
        <Datagrid>
          <TextField source="email" />
          <TextField source="studyId" />
        </Datagrid>
      </List>
    </Stack>
  );
}
