import { Cliente } from 'src/cliente/entities/cliente.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusApolice } from '../enum/status-apolice.enum';
import { TipoSeguro } from '../enum/tipo-seguro.enum';

@Entity()
export class Apolice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.apolices, {
    nullable: false,
  })
  cliente: Cliente;

  @Column({
    type: 'enum',
    enum: TipoSeguro,
  })
  tipoSeguro: TipoSeguro;

  @Column({
    type: 'enum',
    enum: StatusApolice,
    default: StatusApolice.ATIVA,
  })
  status: StatusApolice;

  @Column({ type: 'date' })
  dataInicio: Date;

  @Column({ type: 'date' })
  dataFim: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorMensal: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
