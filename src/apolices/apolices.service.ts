import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateApoliceDto } from './dto/create-apolice.dto';
import { UpdateApoliceDto } from './dto/update-apolice.dto';

import { Apolice } from './entities/apolice.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';

import { StatusApolice } from './enum/status-apolice.enum';
import { DataSource } from 'typeorm';
import { ClienteService } from 'src/cliente/cliente.service';
import { StatusPagamento } from 'src/pagamento/enum/StatusPagamento ';

@Injectable()
export class ApolicesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Apolice)
    private readonly apoliceRepository: Repository<Apolice>,

    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,

    private readonly clienteService: ClienteService,
  ) {}

  async create(dto: CreateApoliceDto): Promise<Apolice> {
    const cliente = await this.clienteService.findOne(dto.clienteId);

    if (dto.dataInicio >= dto.dataFim) {
      throw new BadRequestException(
        'Data de início deve ser menor que a data de fim',
      );
    }
    return this.dataSource.transaction(async (manager) => {
      const apolice = manager.create(Apolice, {
        cliente,
        tipoSeguro: dto.tipoSeguro,
        dataInicio: dto.dataInicio,
        dataFim: dto.dataFim,
        valorMensal: dto.valorMensal,
        status: StatusApolice.ATIVA,
      });

      const apoliceSalva = await manager.save(Apolice, apolice);

      const pagamentos: Pagamento[] = [];

      const inicio = new Date(dto.dataInicio);
      const fim = new Date(dto.dataFim);
      const diaBase = inicio.getDate();

      const mesAtual = criarDataVencimento(
        inicio.getFullYear(),
        inicio.getMonth(),
        diaBase,
      );

      while (mesAtual <= fim) {
        pagamentos.push(
          this.pagamentoRepository.create({
            apolice: apoliceSalva,
            valor: dto.valorMensal,
            vencimento: new Date(mesAtual),
            status: StatusPagamento.PENDENTE,
          }),
        );

        mesAtual.setMonth(mesAtual.getMonth() + 1);
      }

      await manager.save(Pagamento, pagamentos);

      return manager.findOneOrFail(Apolice, {
        where: { id: apoliceSalva.id },
        relations: ['cliente', 'pagamentos'],
      });
    });
  }

  findAll() {
    return this.apoliceRepository.find({
      relations: ['cliente'],
    });
  }

  async findOne(id: number): Promise<Apolice> {
    const apolice = await this.apoliceRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!apolice) {
      throw new NotFoundException(`Apólice com ID ${id} não encontrada`);
    }

    return apolice;
  }

  async update(id: number, dto: UpdateApoliceDto): Promise<Apolice> {
    const apolice = await this.findOne(id);
    Object.assign(apolice, dto);
    return this.apoliceRepository.save(apolice);
  }

  async updateStatus(id: number, status: StatusApolice): Promise<Apolice> {
    const apolice = await this.findOne(id);
    apolice.status = status;
    return this.apoliceRepository.save(apolice);
  }

  async remove(id: number): Promise<void> {
    const apolice = await this.findOne(id);
    await this.apoliceRepository.remove(apolice);
  }
}
function criarDataVencimento(ano: number, mes: number, diaBase: number): Date {
  const data = new Date(ano, mes, diaBase);

  if (data.getMonth() !== mes) {
    return new Date(ano, mes + 1, 0);
  }

  return data;
}
