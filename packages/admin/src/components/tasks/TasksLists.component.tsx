import { FC } from 'react';
import { Datagrid, List, ReferenceField, TextField } from 'react-admin';

export const TasksLists: FC = () => {
  return (
    <List>
      <Datagrid>
        <ReferenceField source="taskSetId" reference="sets">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="cateogry" />
        <TextField source="title" />
        <TextField source="description" />
      </Datagrid>
    </List>
  );
};
