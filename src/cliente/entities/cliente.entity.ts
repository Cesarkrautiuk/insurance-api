import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    type: 'enum',
    enum: TipoPessoa,
  })
  tipoPessoa: TipoPessoa;

  @Column({ unique: true })
  documento: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
