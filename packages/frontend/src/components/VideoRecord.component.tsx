import { Button, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState, useCallback } from 'react';
import { CountDownTimer, CountDownState } from './CountDownTimer.component';
import { ResolvePermissionError } from './ResolvePermissionError.component';

export interface VideoRecordProps {
  downloadRecording: boolean;
  onRecordingStop?: (mediaBlobUrl: string, blob: Blob) => void;
  onSubmit?: (bloblUrl: string, blob: Blob) => void;
  timeLimit: number;
}

export const VideoRecord: React.FC<VideoRecordProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [recording, setRecording] = useState<boolean>(false);
  const stateRef = useRef<{ blobs: Blob[] }>(null);
  stateRef.current = { blobs };
  const [blobPayload, setBlobPayload] = useState<{ blobURL: string; blob: Blob } | null>(null);
  const [countDownState, setCountDownState] = useState<CountDownState>('paused');
  const [issueFound, _setIssueFound] = useState<boolean>(false);

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

  // On data available, store the blob
  const handleOnDataAvailable = useCallback(
    (event: BlobEvent) => {
      const newBlobs = [...stateRef.current!.blobs, event.data];
      setBlobs(newBlobs);

      // If the recording is complete, send the blob to the parent
      if (!recording) {
        const blob = new Blob(newBlobs, { type: 'video/webm' });
        const blobURL = URL.createObjectURL(blob);
        handleCompletion(blobURL, blob);
      }
    },
    [setBlobs, blobs]
  );

  const startRecording = async () => {
    // Clear the blobs
    setBlobs([]);

    // Create the media recorder
    // TODO: In the future have audio be an option
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

    // Setup the preview
    videoRef.current!.srcObject = stream;
    videoRef.current!.play();

    // Set the encoding
    const options = { mimeType: 'video/webm' };

    // Create the media recorder
    let mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = handleOnDataAvailable;

    // Start recording
    mediaRecorder.start();
    setMediaRecorder(mediaRecorder);

    setCountDownState('running');
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setRecording(false);
  };

  // Handle changes to the recording status
  useEffect(() => {
    if (recording) {
      setTimeout(() => {
        stopRecording();
      }, props.timeLimit * 1000);
    }
  }, [recording]);

  // Control the display based on if an active blob is present
  useEffect(() => {
    // If there is no active blob, show the video preview
    if (!blobPayload) {
      videoRef.current!.style.display = 'block';
      videoRef.current!.src = '';
      return;
    }

    // Otherwise show the recording blobl
    videoRef.current!.srcObject = null;
    videoRef.current!.src = blobPayload.blobURL;
  }, [blobPayload]);

  const handleSubmit = () => {
    if (props.onSubmit && blobPayload) {
      props.onSubmit(blobPayload.blobURL, blobPayload.blob);
    }
  };

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
          <Button variant="contained" onClick={() => (recording ? stopRecording() : startRecording())}>
            {recording ? 'Stop Recording' : 'Start Recording'}
          </Button>
        </Grid>

        <Grid size={6}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit Recording
          </Button>
        </Grid>
      </Grid>

      {issueFound == false && <video controls autoPlay loop ref={videoRef} />}
      {issueFound && <ResolvePermissionError />}
    </Stack>
  );
};
