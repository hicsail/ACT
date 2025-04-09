import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { CasdoorService } from './casdoor.service';
import { Request } from 'express';

@Injectable()
export class CasdoorGuard implements CanActivate {
  constructor(private readonly casdoorService: CasdoorService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(`JWT not provided`);
    }

    try {
      // Try to get the user from the token
      const user = this.casdoorService.parseJWT(token);

      // Add the user to the context
      request['user'] = user;

      return true;
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
