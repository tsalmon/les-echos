import { IsEnum, IsIn, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../types/UserRole';

export class SignUpDto {
  @ApiProperty({ description: 'pseudonyme', example: 'tsalmon' })
  @IsString()
  readonly nickname: string;

  @ApiProperty({ description: 'Nom utilisateur', example: 'Thomas Salmon' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Mot de passe', example: 'bazinga' })
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'Adresse utilisateur',
    example: 'Paris 18, France',
  })
  @IsString()
  readonly address: string;

  @ApiProperty({ description: 'A propos', example: 'Développeur Nestjs' })
  @IsString()
  readonly comment: string;

  @ApiProperty({
    description: "Role de l'utilisateur",
    example: UserRole.USER,
    enum: UserRole,
  })
  @IsIn([UserRole.ADMIN, UserRole.USER])
  readonly role: UserRole;
}
