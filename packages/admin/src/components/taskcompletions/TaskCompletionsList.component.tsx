import { FC } from 'react';
import { BooleanField, Datagrid, List, TextField } from 'react-admin';
import { VideoField } from '../fields/VideoField.component';


export const TaskCompletionsList: FC = () => {
  return (
    <List>
      <Datagrid>
        <BooleanField source='complete' />
        <TextField source='video' />
        <VideoField source='video' />
      </Datagrid>
    </List>
  );
};
