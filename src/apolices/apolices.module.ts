import { Module } from '@nestjs/common';
import { ApolicesService } from './apolices.service';
import { ApolicesController } from './apolices.controller';

@Module({
  controllers: [ApolicesController],
  providers: [ApolicesService],
})
export class ApolicesModule {}
