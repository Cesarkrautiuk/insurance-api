import { forwardRef, Module } from '@nestjs/common';
import { ApolicesService } from './apolices.service';
import { ApolicesController } from './apolices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apolice } from './entities/apolice.entity';
import { ClienteModule } from 'src/cliente/cliente.module';
import { PagamentoModule } from 'src/pagamento/pagamento.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apolice]),
    ClienteModule,
    forwardRef(() => PagamentoModule),
  ],
  controllers: [ApolicesController],
  providers: [ApolicesService],
  exports: [ApolicesService],
})
export class ApolicesModule {}
