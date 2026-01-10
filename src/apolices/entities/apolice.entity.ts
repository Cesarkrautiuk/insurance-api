import { Cliente } from 'src/cliente/entities/cliente.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusApolice } from '../enum/status-apolice.enum';
import { TipoSeguro } from '../enum/tipo-seguro.enum';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Sinistro } from 'src/sinistro/entities/sinistro.entity';

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
  @OneToMany(() => Pagamento, (pagamento) => pagamento.apolice)
  pagamentos: Pagamento[];
  @OneToMany(() => Sinistro, (sinistro) => sinistro.apolice)
  sinistros: Sinistro[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
