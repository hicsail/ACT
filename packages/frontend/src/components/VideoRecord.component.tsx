import { Button, Grid, Stack, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useSnackbar } from '../contexts/Snackbar.context';
import { CountDownTimer, CountDownState } from './CountDownTimer.component';
import { ResolvePermissionError } from './ResolvePermissionError.component';

const mimeType = 'video/webm; codecs="opus,vp8"';

export interface VideoRecordProps {
  downloadRecording: boolean;
  onRecordingStop?: (mediaBlobUrl: string, blob: Blob) => void;
  onSubmit?: (bloblUrl: string, blob: Blob) => void;
  timeLimit: number;
}

export const VideoRecord: FC<VideoRecordProps> = (props) => {
  const { pushSnackbarMessage } = useSnackbar();
  const recorder = useReactMediaRecorder({
    video: true,
    audio: true,
    mediaRecorderOptions: {
      mimeType
    },
    onStop: (mediaBlobUrl, blob) => handleCompletion(mediaBlobUrl, blob),
    blobPropertyBag: {
      type: mimeType
    }
  });
  const [countDownState, setCountDownState] = useState<CountDownState>('paused');
  const [blobPayload, setBlobPayload] = useState<{ blobURL: string; blob: Blob } | null>(null);
  const [issueFound, setIssueFound] = useState<boolean>(false);

  const handleCompletion = (blobURL: string, blob: Blob) => {
    if (props.downloadRecording) {
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = 'teacher_tutorial.webm';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    if (props.onRecordingStop) {
      props.onRecordingStop(blobURL, blob);
    }

    setBlobPayload({ blobURL, blob });

    setCountDownState('restart');
  };

  const handleSubmit = () => {
    if (props.onSubmit && blobPayload) {
      props.onSubmit(blobPayload.blobURL, blobPayload.blob);
    }
  };

  const handleRecordClick = () => {
    if (recorder.status == 'recording') {
      recorder.stopRecording();
    } else {
      recorder.startRecording();
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  // Handles switching between live preview and video playback
  useEffect(() => {
    // If in recording mode, show the user the preview
    if (videoRef.current && recorder.previewStream && recorder.status == 'recording') {
      videoRef.current.srcObject = recorder.previewStream;
    }
    // Otherwise, show the user the recording video
    else if (videoRef.current && recorder.mediaBlobUrl) {
      videoRef.current.src = recorder.mediaBlobUrl;
      videoRef.current.srcObject = null;
    }
  }, [recorder.status, recorder.previewStream, recorder.mediaBlobUrl]);

  // Handle starting the counter
  useEffect(() => {
    if (recorder.status == 'recording') {
      setCountDownState('running');
      setTimeout(() => {
        recorder.stopRecording();
      }, props.timeLimit * 1000);
    }
  }, [recorder.status]);

  // Error message handling
  useEffect(() => {
    switch (recorder.error) {
      case 'permission_denied':
        pushSnackbarMessage(
          'You have denied camera or microphone permissions to this site. You must enable permissions to record your video successfully',
          'error'
        );
        setIssueFound(true);
        break;
      case 'media_in_use':
        pushSnackbarMessage(
          'Your camera or microphone is already in use. You must close other apps accessing them in order to record your video successfully',
          'error'
        );
        setIssueFound(true);
        break;
    }
  }, [recorder.error]);

  return (
    <Stack padding={3} spacing={3}>
      <Grid container>
        <Grid size={6}>
          <Typography variant="body1">Camera Status</Typography>
        </Grid>

        <Grid size={6}>
          <CountDownTimer seconds={props.timeLimit} status={countDownState} />
        </Grid>

        <Grid size={6}>
          <Button variant="contained" onClick={handleRecordClick}>
            {recorder.status == 'recording' ? 'Stop Recording' : 'Start Recording'}
          </Button>
        </Grid>

        <Grid size={6}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit Recording
          </Button>
        </Grid>
      </Grid>

      {issueFound == false && <video src={recorder.mediaBlobUrl} controls autoPlay loop ref={videoRef} />}
      {issueFound && <ResolvePermissionError />}
    </Stack>
  );
};
