import { Button, Stack } from "@mui/material";
import { FC, useEffect, useRef } from "react";
import { StatusMessages, useReactMediaRecorder } from "react-media-recorder";
import { useSnackbar } from "../contexts/Snackbar.context";

export interface VideoRecordProps {
  downloadRecording: boolean;
  onRecordingStop?: (mediaBlobUrl: string) => void;
}

export const VideoRecord: FC<VideoRecordProps> = (props) => {
  const { pushSnackbarMessage } = useSnackbar();

  const recorder = useReactMediaRecorder({
    video: true,
    onStop: (mediaBlobUrl, _blob) => handleCompletion(mediaBlobUrl)
  });

  const handleCompletion = (blobURL: string) => {
    if (props.downloadRecording) {
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = 'teacher_tutorial.webm';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    if (props.onRecordingStop) {
      props.onRecordingStop(blobURL);
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  // Handles switching between live preview and video playback
  useEffect(() => {
    // If in recording mode, show the user the preview
    if (videoRef.current && recorder.previewStream && recorder.status == "recording") {
      videoRef.current.srcObject = recorder.previewStream;
    }
    // Otherwise, show the user the recording video
    else if (videoRef.current && recorder.mediaBlobUrl) {
      videoRef.current.src = recorder.mediaBlobUrl;
      videoRef.current.srcObject = null;
    }
  }, [recorder.status, recorder.previewStream, recorder.mediaBlobUrl]);

  // Error message handling
  useEffect(() => {
    switch (recorder.error) {
      case 'permission_denied':
        pushSnackbarMessage('You have denied camera or microphone permissions to this site. You must enable permissions to record your video successfully', 'error');
        break;
      case 'media_in_use':
        pushSnackbarMessage('Your camera or microphone is already in use. You must close other apps accessing them in order to record your video successfully', 'error');
        break;
    }
  }, [recorder.error]);

  return (
    <Stack padding={3} spacing={3}>
      <ControlButtons
        status={recorder.status}
        handleStartRecording={recorder.startRecording}
        handleStopRecording={recorder.stopRecording}
      />
      <video src={recorder.mediaBlobUrl} controls autoPlay loop ref={videoRef} />
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
