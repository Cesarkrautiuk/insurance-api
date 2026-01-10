import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePagamentoDto {
  @IsNotEmpty()
  apoliceId: number;

  @IsNumber()
  valor: number;

  @IsDateString()
  vencimento: Date;
}
