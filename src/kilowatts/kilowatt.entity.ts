import { Mes } from 'src/meses/mes.entity';
import { Pago } from 'src/pagos/pago.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'kilowatts' })
export class Kilowatt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  precio: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;

  @Column()
  mesId: number;

  @ManyToOne(() => Mes, (mes) => mes.kilowatt)
  mes: Mes[];

  @OneToMany(() => Pago, (pago) => pago.kilowatt)
  pagos: Pago[];
}
