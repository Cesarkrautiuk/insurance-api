import { Module } from '@nestjs/common';
import { SinistroService } from './sinistro.service';
import { SinistroController } from './sinistro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sinistro } from './entities/sinistro.entity';
import { ApolicesModule } from 'src/apolices/apolices.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sinistro]), ApolicesModule],
  controllers: [SinistroController],
  providers: [SinistroService],
})
export class SinistroModule {}
