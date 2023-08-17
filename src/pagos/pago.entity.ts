import { Kilowatt } from 'src/kilowatts/kilowatt.entity';
import { Persona } from 'src/personas/persona.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pagos' })
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  kwsMesAnterior: number;

  @Column({ type: 'float' })
  kwsMesActual: number;

  @Column({ type: 'float' })
  totalPagoActual: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ default: 0 })
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;

  @Column()
  personaId: number;

  @Column()
  kilowattId: number;

  @ManyToOne(() => Persona, (persona) => persona.pagos)
  persona: Persona;

  @ManyToOne(() => Kilowatt, (kilowatt) => kilowatt.pagos)
  kilowatt: Kilowatt;
}
