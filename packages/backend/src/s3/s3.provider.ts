import { Provider } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export const S3_PROVIDER = 'S3_CLIENT_PROVIDER';

/** Provides an S3 Client */
export const s3Provider: Provider<S3Client> = {
  provide: S3_PROVIDER,
  useFactory: (configService: ConfigService) => {
    return new S3Client({
      forcePathStyle: true,
      region: configService.getOrThrow<string>('s3.region'),
      credentials: {
        accessKeyId: configService.getOrThrow<string>('s3.accessKeyId'),
        secretAccessKey: configService.getOrThrow<string>('s3.secretAccessKey')
      }
    });
  },
  inject: [ConfigService]
};
