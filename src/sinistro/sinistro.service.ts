import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSinistroDto } from './dto/create-sinistro.dto';
import { Repository } from 'typeorm';
import { Sinistro } from './entities/sinistro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusApolice } from 'src/apolices/enum/status-apolice.enum';
import { StatusSinistro } from './enum/status-sinistro.enum';
import { ApolicesService } from 'src/apolices/apolices.service';

@Injectable()
export class SinistroService {
  constructor(
    @InjectRepository(Sinistro)
    private readonly sinistroRepository: Repository<Sinistro>,

    private readonly apolicesService: ApolicesService,
  ) {}
  async create(dto: CreateSinistroDto) {
    const apolice = await this.apolicesService.findOne(dto.apoliceId);

    if (!apolice) {
      throw new NotFoundException('Apólice não encontrada');
    }

    if (apolice.status !== StatusApolice.ATIVA) {
      throw new BadRequestException(
        'Só é possível criar sinistro para apólice ATIVA',
      );
    }

    const coberturaMaxima = apolice.valorMensal * 12;

    if (dto.valorSolicitado > coberturaMaxima) {
      throw new BadRequestException(
        `Valor solicitado excede a cobertura máxima de ${coberturaMaxima}`,
      );
    }

    const sinistro = this.sinistroRepository.create({
      apolice,
      dataOcorrencia: dto.dataOcorrencia,
      valorSolicitado: dto.valorSolicitado,
      status: StatusSinistro.ABERTO,
    });

    return this.sinistroRepository.save(sinistro);
  }
  async findByApolice(apoliceId: number): Promise<Sinistro[]> {
    return this.sinistroRepository.find({
      where: { apolice: { id: apoliceId } },
    });
  }

  async updateStatus(id: number, status: StatusSinistro): Promise<Sinistro> {
    const sinistro = await this.sinistroRepository.findOneBy({ id });

    if (!sinistro) {
      throw new NotFoundException('Sinistro não encontrado');
    }

    sinistro.status = status;
    return this.sinistroRepository.save(sinistro);
  }
}
