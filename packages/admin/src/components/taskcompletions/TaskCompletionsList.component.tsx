import { FC } from 'react';
import { BooleanField, Datagrid, List, ReferenceField, TextInput, TextField, ReferenceInput } from 'react-admin';
import { VideoField } from '../fields/VideoField.component';
import { Redo } from './Redo.component';

const taskCompletionsFilters = [
  <TextInput label='User' source='userId' />,
  <ReferenceInput source='taskId' reference='tasks' sort={{ field: 'title', order: 'ASC' }} />
];

export const TaskCompletionsList: FC = () => {
  return (
    <List filters={taskCompletionsFilters}>
      <Datagrid>
        <ReferenceField source="taskId" reference="tasks">
          <TextField source="title" />
        </ReferenceField>
        <BooleanField source="complete" />
        <VideoField source="video" />
        <Redo />
      </Datagrid>
    </List>
  );
};
