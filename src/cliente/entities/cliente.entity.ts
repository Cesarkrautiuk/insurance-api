import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { Apolice } from 'src/apolices/entities/apolice.entity';
@Entity()
@Unique(['email'])
@Unique(['documento'])
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

  @OneToMany(() => Apolice, (apolice) => apolice.cliente)
  apolices: Apolice[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
