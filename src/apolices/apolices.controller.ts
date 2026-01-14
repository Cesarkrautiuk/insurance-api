import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApolicesService } from './apolices.service';
import { CreateApoliceDto } from './dto/create-apolice.dto';
import { UpdateApoliceDto } from './dto/update-apolice.dto';
import { StatusApolice } from './enum/status-apolice.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('apolices')
export class ApolicesController {
  constructor(private readonly apolicesService: ApolicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createApoliceDto: CreateApoliceDto) {
    return this.apolicesService.create(createApoliceDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.apolicesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.apolicesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateApoliceDto: UpdateApoliceDto) {
    return this.apolicesService.update(+id, updateApoliceDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: StatusApolice,
  ) {
    return this.apolicesService.updateStatus(id, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.apolicesService.remove(+id);
  }
}
