import { Datagrid, List, TextField } from 'react-admin';
import { FC } from 'react';

export const DownloadsList: FC = () => {

  return(
    <List>
      <Datagrid>
        <TextField source='status' />
      </Datagrid>
    </List>
  );
};
