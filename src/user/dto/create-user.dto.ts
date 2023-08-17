import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre de usuario debe ser una cadena' })
  username: string;

  @IsString({ message: 'La clave debe ser una cadena' })
  @MinLength(3, { message: 'La clave debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'La clave no debe ser mayor de 50 caracteres' })
  password: string;
}
