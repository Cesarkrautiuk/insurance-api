import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SinistroService } from './sinistro.service';
import { CreateSinistroDto } from './dto/create-sinistro.dto';
import { UpdateSinistroDto } from './dto/update-sinistro.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sinistro')
export class SinistroController {
  constructor(private readonly sinistroService: SinistroService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateSinistroDto) {
    return this.sinistroService.create(dto);
  }

  @Get('/apolice/:apoliceId')
  @UseGuards(JwtAuthGuard)
  findByApolice(@Param('apoliceId', ParseIntPipe) apoliceId: number) {
    return this.sinistroService.findByApolice(apoliceId);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSinistroDto,
  ) {
    return this.sinistroService.updateStatus(id, dto.status);
  }
}
