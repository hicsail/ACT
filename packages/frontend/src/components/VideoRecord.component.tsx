import { Button, Stack } from '@mui/material';
import { FC, useRef } from 'react';
import { ReactMediaRecorder, StatusMessages } from 'react-media-recorder';


export const VideoRecord: FC = () => {
  return (
    <ReactMediaRecorder
      video
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <Stack padding={3}>
          <ControlButtons status={status} handleStartRecording={startRecording} handleStopRecording={stopRecording} />

          <video src={mediaBlobUrl} controls autoPlay loop />
        </Stack>
      )}
    />
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
