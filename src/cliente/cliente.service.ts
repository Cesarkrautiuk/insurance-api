import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ClienteErrors } from 'src/common/errors/error-messages';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const existentes = await this.clienteRepository.find({
      where: [
        { email: createClienteDto.email },
        { documento: createClienteDto.documento },
      ],
    });

    const emailExiste = existentes.some(
      (c) => c.email === createClienteDto.email,
    );

    const documentoExiste = existentes.some(
      (c) => c.documento === createClienteDto.documento,
    );

    if (emailExiste) {
      throw new BusinessException(ClienteErrors.EMAIL_JA_CADASTRADO);
    }

    if (documentoExiste) {
      throw new BusinessException(ClienteErrors.DOCUMENTO_JA_CADASTRADO);
    }
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    Object.assign(cliente, dto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}
