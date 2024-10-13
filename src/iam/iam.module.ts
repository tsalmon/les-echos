import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationController } from '../users/authentication/authentication.controller';
import { AuthenticationService } from '../users/authentication/authentication.service';
import jwtConfig from '../users/config/jwt.config';
import { User } from '../users/entities/user.entity';
import { BcryptService } from '../users/hashing/bcrypt.service';
import { HashingService } from '../users/hashing/hashing.service';
import { AccessTokenGuard } from '../users/guards/access-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
})
export class IamModule {}
