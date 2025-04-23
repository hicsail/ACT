import { FC } from 'react';
import {
  BooleanField,
  Datagrid,
  List,
  ReferenceField,
  TextField,
  ReferenceInput,
  AutocompleteInput
} from 'react-admin';
import { VideoField } from '../fields/VideoField.component';
import { Redo } from './Redo.component';

const taskCompletionsFilters = [
  <ReferenceInput source="taskId" reference="tasks" sort={{ field: 'title', order: 'ASC' }} />,
  <ReferenceInput source="userId" reference="users" sort={{ field: 'email', order: 'ASC' }}>
    <AutocompleteInput label="email" optionText="email" />
  </ReferenceInput>
];

export const TaskCompletionsList: FC = () => {
  return (
    <List filters={taskCompletionsFilters}>
      <Datagrid>
        <ReferenceField source="taskId" reference="tasks">
          <TextField source="title" />
        </ReferenceField>
        <ReferenceField source="userId" reference="users">
          <TextField source="email" />
        </ReferenceField>
        <BooleanField source="complete" />
        <VideoField source="video" />
        <Redo />
      </Datagrid>
    </List>
  );
};
