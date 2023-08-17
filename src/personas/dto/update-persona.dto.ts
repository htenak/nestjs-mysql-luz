import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdatePersonaDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  nombres?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  alias?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  estado?: number;
}
