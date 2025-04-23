import { Datagrid, List, TextField } from 'react-admin';
import { FC } from 'react';
import { SetActive } from './SetActive.component';

export const SetsList: FC = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
        <TextField source="description" />
        <SetActive />
      </Datagrid>
    </List>
  );
};
