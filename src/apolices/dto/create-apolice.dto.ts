import { IsDateString, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { TipoSeguro } from '../enum/tipo-seguro.enum';

export class CreateApoliceDto {
  @IsNumber()
  clienteId: number;

  @IsEnum(TipoSeguro)
  tipoSeguro: TipoSeguro;

  @IsDateString()
  dataInicio: Date;

  @IsDateString()
  dataFim: Date;

  @IsNumber()
  @IsPositive()
  valorMensal: number;
}
