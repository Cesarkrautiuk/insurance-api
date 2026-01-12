import { forwardRef, Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { ApolicesModule } from 'src/apolices/apolices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagamento]),
    forwardRef(() => ApolicesModule),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
  exports: [PagamentoService],
})
export class PagamentoModule {}
