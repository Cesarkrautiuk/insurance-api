import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { Repository } from 'typeorm';
import { ApolicesService } from 'src/apolices/apolices.service';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,

    private readonly apolicesService: ApolicesService,
  ) {}
  async create(dto: CreatePagamentoDto) {
    const apolice = await this.apolicesService.findOne(dto.apoliceId);
    if (!apolice) {
      throw new NotFoundException('Apólice não encontrada');
    }
    const pagamento = this.pagamentoRepository.create({
      apolice,
      valor: dto.valor,
      vencimento: dto.vencimento,
    });
    return this.pagamentoRepository.save(pagamento);
  }

  findAll() {
    return `This action returns all pagamento`;
  }

  findOne(apoliceId: number) {
    return this.pagamentoRepository.find({
      where: { apolice: { id: apoliceId } },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} pagamento`;
  }
}
