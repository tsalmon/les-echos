import { IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/types/UserRole';

export class PaginationQueryDto {
  @ApiProperty({ description: 'Limite', example: 10 })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({ description: 'Page', example: 1, required: false })
  @IsOptional()
  @Min(0)
  offset: number;

  @ApiProperty({ description: 'Nom', required: false })
  @IsOptional()
  nickname: string;

  @ApiProperty({ description: 'Nom', required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Addresse', required: false })
  @IsOptional()
  address: string;

  @ApiProperty({ description: 'Commentaire', required: false })
  @IsOptional()
  comment: string;

  @ApiProperty({ description: 'rôle', required: false, enum: UserRole })
  @IsOptional()
  role: string;
}
