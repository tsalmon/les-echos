import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from '../authentication/dto/sign-up.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {}
