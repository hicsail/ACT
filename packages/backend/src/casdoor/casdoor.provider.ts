import { SDK } from 'casdoor-nodejs-sdk';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const CASDOOR_PROVIDER = 'CASDOOR_PROVIDER';

export const casdoorProvider: Provider<SDK> = {
  provide: CASDOOR_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new SDK({
      endpoint: configService.getOrThrow<string>('casdoor.endpoint'),
      clientId: configService.getOrThrow<string>('casdoor.clientId'),
      clientSecret: configService.getOrThrow<string>('casdoor.clientSecret'),
      certificate: configService.getOrThrow<string>('casdoor.certificate'),
      orgName: configService.getOrThrow<string>('casdoor.orgName'),
      appName: configService.getOrThrow<string>('casdoor.appName')
    });
  }
};
