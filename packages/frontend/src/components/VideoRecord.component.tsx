import { Button, Stack } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { StatusMessages, useReactMediaRecorder } from 'react-media-recorder';

export const VideoRecord: FC = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // If in recording mode, show the user the preview
    if (videoRef.current && previewStream && status == 'recording') {
      videoRef.current.srcObject = previewStream;
    }
    // Otherwise, show the user the recording video
    else if(videoRef.current && mediaBlobUrl) {
      videoRef.current.src = mediaBlobUrl;
      videoRef.current.srcObject = null;
    }
  }, [status, previewStream, mediaBlobUrl]);

  return (
    <Stack padding={3} spacing={3}>
      <ControlButtons status={status} handleStartRecording={startRecording} handleStopRecording={stopRecording} />
      <video src={mediaBlobUrl} controls autoPlay loop ref={videoRef} />
    </Stack>
  )
};

interface ControlButtonsProps {
  status: StatusMessages;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
}

const ControlButtons: FC<ControlButtonsProps> = (props) => {
  const handleRecordingPress = () => {
    if (props.status == 'recording') {
      props.handleStopRecording();
    } else {
      props.handleStartRecording();
    }
  };

  return (
    <Stack direction='row' justifyContent='space-around' >
      <Button variant='contained' onClick={handleRecordingPress}>{props.status == 'recording' ? 'Stop Recording' : 'Start Recording'}</Button>
      <Button variant='contained'>Submit Recording</Button>
    </Stack>
  );
}
