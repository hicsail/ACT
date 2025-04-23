import { useRecordContext } from 'react-admin';
import { FC, useEffect, useState, useRef } from 'react';
import { taskCompletionsControllerGetVideoDownloadUrl } from '../../client';
import { Box } from '@mui/material';

interface VideoViewProps {
  video: string;
  maxSize: number;
}

const VideoView: FC<VideoViewProps> = ({ video, maxSize }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  /** Set the video to the middle frame */
  const setPauseFrame = async () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.currentTime = 0;
  };

  // Set the video to the middle frame when the video is loaded
  useEffect(() => {
    setPauseFrame();
  }, [videoRef.current]);

  return (
    <Box sx={{ maxWidth: maxSize }}>
      <video
        width={maxSize}
        ref={videoRef}
        autoPlay={false}
        controls={true}
      >
        <source src={video} />
      </video>
    </Box>
  );
};


export const VideoField: FC<{ source: string}> = ({ source }) => {
  const record = useRecordContext();
  const [url, setUrl] = useState<string | null>(null);

  if (!record) {
    return null;
  }

  const getVideoURL = async () => {
    const urlResponse = await taskCompletionsControllerGetVideoDownloadUrl({
      query: {
        video: record[source]
      }
    });

    if (urlResponse.error || !urlResponse.data) {
      // TODO: Handle inability to get video URL
      console.error(urlResponse.error);
      return;
    }

    setUrl(urlResponse.data);
  };

  useEffect(() => {
    if (!record || !record['complete']) {
      return;
    }

    getVideoURL();
  }, [record]);

  return (
    url && <VideoView video={url} maxSize={300} />
  );
};
