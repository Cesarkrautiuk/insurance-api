import { Module } from '@nestjs/common';
import { ApolicesService } from './apolices.service';
import { ApolicesController } from './apolices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apolice } from './entities/apolice.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Apolice, Pagamento]), ClienteModule],
  controllers: [ApolicesController],
  providers: [ApolicesService],
  exports: [ApolicesService],
})
export class ApolicesModule {}
