import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { REQUEST_USER_KEY } from '../iam.constants';
import jwtConfig from '../config/jwt.config';
import { UserRole } from '../types/UserRole';

@Injectable()
export class AdminOnly implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException();
      }

      request[REQUEST_USER_KEY] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
