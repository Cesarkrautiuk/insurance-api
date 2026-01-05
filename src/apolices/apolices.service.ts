import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApoliceDto } from './dto/create-apolice.dto';
import { UpdateApoliceDto } from './dto/update-apolice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Apolice } from './entities/apolice.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { StatusApolice } from './enum/status-apolice.enum';

@Injectable()
export class ApolicesService {
  constructor(
    @InjectRepository(Apolice)
    private readonly apoliceRepository: Repository<Apolice>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}
  async create(dto: CreateApoliceDto): Promise<Apolice> {
    const cliente = await this.clienteRepository.findOneBy({
      id: dto.clienteId,
    });
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${dto.clienteId} não encontrado`,
      );
    }
    if (dto.dataInicio >= dto.dataFim) {
      throw new BadRequestException(
        'Data de início deve ser menor que a data de fim',
      );
    }
    const apolice = this.apoliceRepository.create({
      cliente,
      tipoSeguro: dto.tipoSeguro,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      valorMensal: dto.valorMensal,
      status: StatusApolice.ATIVA,
    });
    return this.apoliceRepository.save(apolice);
  }

  findAll() {
    return this.apoliceRepository.find({ relations: ['cliente'] });
  }

  async findOne(id: number) {
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

    if (!apolice) {
      throw new NotFoundException(`Apólice com ID ${id} não encontrada`);
    }
    Object.assign(apolice, dto);

    return this.apoliceRepository.save(apolice);
  }
  async updateStatus(id: number, status: StatusApolice): Promise<Apolice> {
    const apolice = await this.findOne(id);

    if (!apolice) {
      throw new NotFoundException(`Apólice com ID ${id} não encontrada`);
    }

    apolice.status = status;

    return this.apoliceRepository.save(apolice);
  }

  async remove(id: number): Promise<void> {
    const apolice = await this.findOne(id);
    await this.apoliceRepository.remove(apolice);
  }
}
