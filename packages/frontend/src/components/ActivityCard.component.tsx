import { FC, useEffect, useState } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import {
  AccessTime,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
} from "@mui/icons-material";
import cameraCheckImage from "../assets/TutorialPreviewImage.png";
import { useNavigate } from "react-router";
import { taskCompletionsControllerFindOrCreateByTask, TaskEntity } from "../client";
import taskPreviewImage from '../assets/TaskPreviewImage.png';
import { TaskCompletionEntity } from "../client";

export interface ActivityCardProps {
  previewImage: string;
  activityTitle: string;
  activityDescription: string;
  activityEstimatedTime: string;
  activityComplete: boolean;
  onSelectionAction: () => void;
}

export const ActivityCard: FC<ActivityCardProps> = (props) => {
  return (
    <Grid container>
      <Grid size={4}>
        <img src={props.previewImage} width="100%" />
      </Grid>

      <Grid size={8}>
        <Stack spacing={2}>
          <Typography variant="h3">{props.activityTitle}</Typography>
          <Typography variant="body1">{props.activityDescription}</Typography>

          <Stack direction="row" alignItems="center">
            <Stack direction="row" sx={{ flex: 1 }} alignItems="center" gap={1}>
              <AccessTime />
              <Typography variant="body1">
                {props.activityEstimatedTime}
              </Typography>
            </Stack>
            <Button variant="contained" onClick={props.onSelectionAction}>
              {props.activityComplete ? "Retake" : "Start"}
            </Button>
          </Stack>

          {props.activityComplete ? <CompleteStatus /> : <IncompleteStatus />}
        </Stack>
      </Grid>
    </Grid>
  );
};

const CompleteStatus: FC = () => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <CheckBoxOutlined />
      <Typography variant="body1">Completed</Typography>
    </Stack>
  );
};

const IncompleteStatus: FC = () => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <CheckBoxOutlineBlank />
      <Typography variant="body1">Not Completed</Typography>
    </Stack>
  );
};


export const CameraCheckActivity: FC = () => {
  const navigate = useNavigate();

  return (
    <ActivityCard
      previewImage={cameraCheckImage}
      activityTitle="Camera and Mic Check"
      activityDescription="Click start to check that your camera and microphone are working properly, by recording a five second video. This is essential to successful engagement with the tasks and for accurate data collection."
      activityEstimatedTime="5s"
      activityComplete={false}
      onSelectionAction={() => navigate("/cam-check")}
    />
  )
};

export interface TaskActivityProps {
  task: TaskEntity;
}

export const TaskActivity: FC<TaskActivityProps> = ({ task }) => {
  const [taskCompletion, setTaskCompletion] = useState<TaskCompletionEntity | null>(null);

  const getTaskCompletion = async () => {
    const taskCompletionResult = await taskCompletionsControllerFindOrCreateByTask({
      query: {
        task: task.id
      }
    });

    if (taskCompletionResult.error || !taskCompletionResult.data) {
      // TODO: Handle error
      return;
    }

    setTaskCompletion(taskCompletionResult.data);
  };

  useEffect(() => {
    getTaskCompletion();
  }, []);

  return (
    <ActivityCard
      previewImage={taskPreviewImage}
      activityTitle={task.title}
      activityDescription={task.preview}
      activityEstimatedTime={task.timeSeconds + ''}
      activityComplete={taskCompletion ? taskCompletion.complete : false}
      onSelectionAction={() => console.log('hi :)')}
    />
  );
};
