import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateKilowattDto {
  @IsNumber()
  @Min(0.0001, { message: 'El precio es inválido' })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  precio: number;

  @IsString({ message: 'La fecha debe ser texto' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  fecha: Date;

  @IsNumber()
  @Min(1, { message: 'El mes es inválido' })
  @IsNotEmpty({ message: 'El mes el obligatorio' })
  mesId: number;
}
