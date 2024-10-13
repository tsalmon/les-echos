import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../../users/entities/user.entity';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserRole } from '../../users/types/UserRole';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}
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

  signIn(signInDto: SignInDto) {}
}
