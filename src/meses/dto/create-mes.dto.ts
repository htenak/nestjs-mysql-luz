import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMesDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
  @MinLength(1, { message: 'El nombre debe tener al menos 1 caracter' })
  @MaxLength(20, { message: 'El nombre debe tener como máximo 20 caracteres' })
  nombre: string;
}
