import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { EntityManager, LessThan, Repository } from 'typeorm';
import { Apolice } from 'src/apolices/entities/apolice.entity';
import { criarDataVencimento } from './domain/criar-data-vencimento';
import { StatusPagamento } from './enum/StatusPagamento ';
import { calcularDiasAtraso } from './domain/calcular-dias-atraso';
import { calcularValorAtualizado } from './domain/calcular-valor-atualizado';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,
  ) {}
  async gerarParcelas(
    apolice: Apolice,
    valorMensal: number,
    dataInicio: Date,
    dataFim: Date,
    manager: EntityManager,
  ) {
    const pagamentos: Pagamento[] = [];

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diaBase = inicio.getDate();

    let vencimento = criarDataVencimento(
      inicio.getFullYear(),
      inicio.getMonth(),
      diaBase,
    );

    while (vencimento <= fim) {
      pagamentos.push(
        manager.create(Pagamento, {
          apolice,
          valor: valorMensal,
          vencimento,
          status: StatusPagamento.PENDENTE,
        }),
      );

      vencimento = criarDataVencimento(
        vencimento.getFullYear(),
        vencimento.getMonth() + 1,
        diaBase,
      );
    }

    await manager.save(Pagamento, pagamentos);
  }
  findByApolice(apoliceId: number) {
    return this.pagamentoRepository.find({
      where: { apolice: { id: apoliceId } },
      order: { vencimento: 'ASC' },
    });
  }

  async remove(id: number) {
    const pagamento = await this.pagamentoRepository.findOne({
      where: { id },
    });

    if (!pagamento) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    return this.pagamentoRepository.remove(pagamento);
  }
  async listarPorApolice(apoliceId: number): Promise<Pagamento[]> {
    return this.pagamentoRepository.find({
      where: { apolice: { id: apoliceId } },
      order: { vencimento: 'ASC' },
    });
  }
  async findOne(id: number) {
    const pagamento = await this.pagamentoRepository.findOne({
      where: { id: id },
    });

    if (!pagamento) {
      throw new NotFoundException('Pagamento não encontrado');
    }
    return pagamento;
  }
  @Cron('0 5 0 * * *')
  async atualizarPagamentosAtrasados(): Promise<void> {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const pagamentosPendentes = await this.pagamentoRepository.find({
      where: {
        status: StatusPagamento.PENDENTE,
        vencimento: LessThan(hoje),
      },
    });

    for (const pagamento of pagamentosPendentes) {
      const diasAtraso = calcularDiasAtraso(pagamento.vencimento);

      if (diasAtraso > 0) {
        const { multa, juros, valorAtualizado } = calcularValorAtualizado(
          pagamento.valor,
          pagamento.vencimento,
        );

        pagamento.status = StatusPagamento.ATRASADO;
        pagamento.multa = multa;
        pagamento.juros = juros;
        pagamento.valorAtualizado = valorAtualizado;
      }
    }
    await this.pagamentoRepository.save(pagamentosPendentes);
  }
  async baixarPagamento(idPagamento: number): Promise<Pagamento> {
    const pagamento = await this.findOne(idPagamento);
    if (!pagamento) {
      throw new NotFoundException('Pagamento não encontrado');
    }
    pagamento.status = StatusPagamento.PAGO;
    return this.pagamentoRepository.save(pagamento);
  }
}
