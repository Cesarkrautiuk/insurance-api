import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSinistroDto {
  @IsNotEmpty()
  apoliceId: number;

  @IsDateString()
  dataOcorrencia: Date;

  @IsNumber()
  valorSolicitado: number;
}
