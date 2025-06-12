import { Button } from 'react-admin';
import { FC, useEffect, useState } from 'react';
import { useRecordContext } from 'react-admin';
import { downloadsControllerGetDownloadUrl } from '../../client';

export const DownloadButton: FC<{ source: string }> = ({ source }) => {
  const record = useRecordContext();
  if (!record) {
    return null;
  }

  const [url, setUrl] = useState<string | null>(null);

  const getDownloadURL = async () => {
    const urlResponse = await downloadsControllerGetDownloadUrl({
      query: { downloadLocation: source }
    });

    if (urlResponse.error || !urlResponse.data) {
      // TODO: Handle inability to get video URL
      console.error(urlResponse.error);
      return;
    }

    setUrl(urlResponse.data);
  }

  useEffect(() => {
    getDownloadURL();
  }, []);

  const onDownload = (url: string) => {
    const link = document.createElement("a");
    link.download = source.split('/')[1];
    link.href = url;
    link.click();
  };

  return url && <Button variant='contained' disabled={record['status'] != 'COMPLETE'} onClick={() => onDownload(url)}>Download</Button>
};
