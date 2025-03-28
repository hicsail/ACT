import { Button, Stack } from "@mui/material";
import { FC, useEffect, useRef } from "react";
import { StatusMessages, useReactMediaRecorder } from "react-media-recorder";
import { useSnackbar } from "../contexts/Snackbar.context";

export const VideoRecord: FC = () => {
  const { pushSnackbarMessage } = useSnackbar();

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream, error } =
    useReactMediaRecorder({ video: true });

  const videoRef = useRef<HTMLVideoElement>(null);

  // Handles switching between live preview and video playback
  useEffect(() => {
    // If in recording mode, show the user the preview
    if (videoRef.current && previewStream && status == "recording") {
      videoRef.current.srcObject = previewStream;
    }
    // Otherwise, show the user the recording video
    else if (videoRef.current && mediaBlobUrl) {
      videoRef.current.src = mediaBlobUrl;
      videoRef.current.srcObject = null;
    }
  }, [status, previewStream, mediaBlobUrl]);

  // Error message handling
  useEffect(() => {
    switch (error) {
      case 'permission_denied':
        pushSnackbarMessage('You have denied camera or microphone permissions to this site. You must enable permissions to record your video successfully', 'error');
        break;
      case 'media_in_use':
        pushSnackbarMessage('Your camera or microphone is already in use. You must close other apps accessing them in order to record your video successfully', 'error');
        break;
    }
  }, [error]);

  useEffect(() => {
    // console.log(error);
  }, [error])

  return (
    <Stack padding={3} spacing={3}>
      <ControlButtons
        status={status}
        handleStartRecording={startRecording}
        handleStopRecording={stopRecording}
      />
      <video src={mediaBlobUrl} controls autoPlay loop ref={videoRef} />
    </Stack>
  );
};

interface ControlButtonsProps {
  status: StatusMessages;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
}

const ControlButtons: FC<ControlButtonsProps> = (props) => {
  const handleRecordingPress = () => {
    if (props.status == "recording") {
      props.handleStopRecording();
    } else {
      props.handleStartRecording();
    }
  };

  return (
    <Stack direction="row" justifyContent="space-around">
      <Button variant="contained" onClick={handleRecordingPress}>
        {props.status == "recording" ? "Stop Recording" : "Start Recording"}
      </Button>
      <Button variant="contained">Submit Recording</Button>
    </Stack>
  );
};
