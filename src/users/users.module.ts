import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [UsersController, AuthenticationController],
  providers: [
    UsersService,
    AuthenticationService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
})
export class UsersModule {}
