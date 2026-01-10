import { PartialType } from '@nestjs/mapped-types';
import { CreateSinistroDto } from './create-sinistro.dto';
import { IsEnum } from 'class-validator';
import { StatusSinistro } from '../enum/status-sinistro.enum';

export class UpdateSinistroDto extends PartialType(CreateSinistroDto) {
  @IsEnum(StatusSinistro)
  status: StatusSinistro;
}
