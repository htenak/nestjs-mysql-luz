import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateMesDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  nombre?: string;
}
