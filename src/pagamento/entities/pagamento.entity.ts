import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusPagamento } from '../enum/StatusPagamento ';
import { Apolice } from 'src/apolices/entities/apolice.entity';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Apolice, (apolice) => apolice.pagamentos, {
    nullable: false,
  })
  apolice: Apolice;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'date' })
  vencimento: Date;

  @Column({
    type: 'enum',
    enum: StatusPagamento,
    default: StatusPagamento.PENDENTE,
  })
  status: StatusPagamento;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
