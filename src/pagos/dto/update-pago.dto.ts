import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdatePagoDto {
  @IsNumber()
  @IsOptional()
  kwsMesAnterior?: number;

  @IsNumber()
  @IsOptional()
  kwsMesActual?: number;

  @IsNumber()
  @IsOptional()
  totalPagoActual?: number;

  @IsString()
  @IsOptional()
  fecha?: Date;

  @IsNumber()
  @IsOptional()
  personaId?: number;

  @IsNumber()
  @IsOptional()
  kilowattId?: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  estado?: number;
}
