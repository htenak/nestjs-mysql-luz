import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateKilowattDto {
  @IsNumber()
  @Min(0.0001, { message: 'El precio es inválido' })
  @IsOptional()
  precio?: number;

  @IsString({ message: 'La fecha debe ser texto' })
  @IsOptional()
  fecha?: Date;

  @IsNumber()
  @IsOptional()
  mesId?: number;
}
