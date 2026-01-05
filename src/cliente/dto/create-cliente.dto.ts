import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
export class CreateClienteDto {
  @IsNotEmpty()
  nome: string;

  @IsEnum(TipoPessoa)
  tipoPessoa: TipoPessoa;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  documento: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;
}
