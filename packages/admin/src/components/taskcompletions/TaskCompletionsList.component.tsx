import { FC } from 'react';
import { BooleanField, Datagrid, List, ReferenceField, TextField } from 'react-admin';
import { VideoField } from '../fields/VideoField.component';
import { Redo } from './Redo.component';

export const TaskCompletionsList: FC = () => {
  return (
    <List>
      <Datagrid>
        <ReferenceField source='taskId' reference='tasks'>
          <TextField source='title' />
        </ReferenceField>
        <BooleanField source="complete" />
        <VideoField source="video" />
        <Redo />
      </Datagrid>
    </List>
  );
};
