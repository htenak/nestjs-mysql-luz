import { Kilowatt } from 'src/kilowatts/kilowatt.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'meses' })
export class Mes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  nombre: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;

  @OneToMany(() => Kilowatt, (kilowatt) => kilowatt.mes)
  kilowatt: number;
}
