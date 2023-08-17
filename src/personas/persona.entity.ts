import { Pago } from 'src/pagos/pago.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'personas' })
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombres: string;

  @Column({ length: 10, nullable: true })
  alias: string;

  @Column({ default: 1 })
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;

  @OneToMany(() => Pago, (pago) => pago.persona)
  pagos: Pago[];
}
