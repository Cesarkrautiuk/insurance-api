import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApoliceDto } from './dto/create-apolice.dto';
import { UpdateApoliceDto } from './dto/update-apolice.dto';
import { Apolice } from './entities/apolice.entity';
import { StatusApolice } from './enum/status-apolice.enum';
import { DataSource } from 'typeorm';
import { ClienteService } from 'src/cliente/cliente.service';
import { PagamentoService } from 'src/pagamento/pagamento.service';

@Injectable()
export class ApolicesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Apolice)
    private readonly apoliceRepository: Repository<Apolice>,
    private readonly clienteService: ClienteService,
    @Inject(forwardRef(() => PagamentoService))
    private readonly pagamentoService: PagamentoService,
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

      await this.pagamentoService.gerarParcelas(
        apoliceSalva,
        dto.valorMensal,
        dto.dataInicio,
        dto.dataFim,
        manager,
      );

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
