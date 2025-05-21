import { Controller, Get, Post, Query } from '@nestjs/common';
import { CasdoorService } from './casdoor.service';

@Controller('casdoor')
export class CasdoorController {
  constructor(private readonly casdoorService: CasdoorService) {}

  @Get('/redirect')
  handleRedirect(@Query('origin') origin?: 'frontend' | 'admin'): { url: string } {
    return this.casdoorService.getSignInURL(origin);
  }

  @Post('/signin')
  async handleSignin(@Query('code') code: string): Promise<{ token: string }> {
    return this.casdoorService.handleSignup(code);
  }
}
