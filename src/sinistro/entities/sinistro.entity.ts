import { Apolice } from 'src/apolices/entities/apolice.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusSinistro } from '../enum/status-sinistro.enum';
@Entity()
export class Sinistro {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Apolice, (apolice) => apolice.sinistros, {
    nullable: false,
  })
  apolice: Apolice;

  @Column({ type: 'date' })
  dataOcorrencia: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorSolicitado: number;

  @Column({
    type: 'enum',
    enum: StatusSinistro,
    default: StatusSinistro.ABERTO,
  })
  status: StatusSinistro;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
