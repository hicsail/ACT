import { Inject, Injectable } from '@nestjs/common';
import { CASDOOR_PROVIDER } from './casdoor.provider';
import { SDK as CasdoorSDK } from 'casdoor-nodejs-sdk';
import { ConfigService } from '@nestjs/config';
import { User } from 'casdoor-nodejs-sdk/lib/cjs/user';

@Injectable()
export class CasdoorService {
  private readonly frontendCallbackURL;
  private readonly adminCallbackURL;

  constructor(
    @Inject(CASDOOR_PROVIDER) private readonly casdoor: CasdoorSDK,
    configService: ConfigService
  ) {
    this.frontendCallbackURL = configService.getOrThrow<string>('frontend.authCallback');
    this.adminCallbackURL = configService.getOrThrow<string>('admin.authCallback');
  }

  getSignInURL(origin: 'frontend' | 'admin' | undefined): { url: string } {
    let url = this.frontendCallbackURL;
    if (origin === 'admin') {
      url = this.adminCallbackURL;
    }

    return {
      url: this.casdoor.getSignInUrl(url)
    };
  }

  async handleSignup(code: string): Promise<{ token: string }> {
    const token = await this.casdoor.getAuthToken(code);
    return {
      token: token.access_token
    };
  }

  async parseJWT(jwt: string): Promise<User> {
    return this.casdoor.parseJwtToken(jwt);
  }

  async updateUser(user: User): Promise<void> {
    await this.casdoor.updateUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.casdoor.getUsers();
    for (const user of users.data.data) {
      if (user.email === email) {
        return user;
      }
    }

    return null;
  }
}
