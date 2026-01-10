import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolicesModule } from './apolices/apolices.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { SinistroModule } from './sinistro/sinistro.module';

@Module({
  imports: [
    ClienteModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'insurance_db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ApolicesModule,
    PagamentoModule,
    SinistroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
