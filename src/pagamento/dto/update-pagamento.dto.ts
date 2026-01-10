import { PartialType } from '@nestjs/mapped-types';
import { CreatePagamentoDto } from './create-pagamento.dto';
import { IsEnum } from 'class-validator';
import { StatusPagamento } from '../enum/StatusPagamento ';

export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto) {
  @IsEnum(StatusPagamento)
  status: StatusPagamento;
}
