import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePagoDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Los KWs del mes pasado son obigatorio' })
  kwsMesAnterior: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Los KWs del mes actual son obigatorio' })
  kwsMesActual: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El total a pagar es obligatorio' })
  totalPagoActual: number;

  @IsNumber()
  @IsNotEmpty({ message: 'La persona es obligatorio' })
  personaId: number;

  @IsNumber()
  @IsNotEmpty()
  kilowattId: number;
}
