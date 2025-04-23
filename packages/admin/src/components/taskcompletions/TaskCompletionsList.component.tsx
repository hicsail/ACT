import { FC } from "react";
import { BooleanField, Datagrid, List } from "react-admin";
import { VideoField } from "../fields/VideoField.component";
import { Redo } from "./Redo.component";

export const TaskCompletionsList: FC = () => {
  return (
    <List>
      <Datagrid>
        <BooleanField source="complete" />
        <VideoField source="video" />
        <Redo />
      </Datagrid>
    </List>
  );
};
