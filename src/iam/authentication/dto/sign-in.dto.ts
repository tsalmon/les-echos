import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ description: 'Pseudo', example: 'tsalmon' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: 'Mot de passe', example: 'bazinga' })
  @MinLength(6)
  password: string;
}
