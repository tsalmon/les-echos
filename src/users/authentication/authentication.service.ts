import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../entities/user.entity';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserRole } from '../types/UserRole';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   *
   * @param signUpDto
   */
  async signUp(signUpDto: SignUpDto) {
    const { role } = signUpDto;
    if (role !== UserRole.ADMIN && role !== UserRole.USER) {
      throw new BadRequestException('Role should be admin or user');
    }

    try {
      const password = await this.hashingService.hash(signUpDto.password);
      const user = this.userRepository.create({
        ...signUpDto,
        password,
      });

      await this.userRepository.save(user);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  /**
   * @param signInDto
   */
  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({
      nickname: signInDto.nickname,
    });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        nickname: user.nickname,
        role: user.role,
      },
      {
        secret: this.jwtConfiguration.secret,
      },
    );

    return {
      accessToken,
    };
  }
}
