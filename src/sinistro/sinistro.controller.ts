import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SinistroService } from './sinistro.service';
import { CreateSinistroDto } from './dto/create-sinistro.dto';
import { UpdateSinistroDto } from './dto/update-sinistro.dto';

@Controller('sinistro')
export class SinistroController {
  constructor(private readonly sinistroService: SinistroService) {}

  @Post()
  create(@Body() dto: CreateSinistroDto) {
    return this.sinistroService.create(dto);
  }

  @Get('/apolice/:apoliceId')
  findByApolice(@Param('apoliceId', ParseIntPipe) apoliceId: number) {
    return this.sinistroService.findByApolice(apoliceId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSinistroDto,
  ) {
    return this.sinistroService.updateStatus(id, dto.status);
  }
}
