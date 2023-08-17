import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePersonaDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(1, { message: 'El nombre debe tener al menos 1 caracter' })
  @MaxLength(100, { message: 'El nombre no debe tener mas de 100 caracteres' })
  nombres: string;

  @IsString({ message: 'El apodo debe ser texto' })
  @IsOptional()
  @MaxLength(10, { message: 'El apodo debe ser menor de 10 caracteres' })
  alias?: string;
}
