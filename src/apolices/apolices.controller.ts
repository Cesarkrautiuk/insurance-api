import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApolicesService } from './apolices.service';
import { CreateApoliceDto } from './dto/create-apolice.dto';
import { UpdateApoliceDto } from './dto/update-apolice.dto';
import { StatusApolice } from './enum/status-apolice.enum';

@Controller('apolices')
export class ApolicesController {
  constructor(private readonly apolicesService: ApolicesService) {}

  @Post()
  create(@Body() createApoliceDto: CreateApoliceDto) {
    return this.apolicesService.create(createApoliceDto);
  }

  @Get()
  findAll() {
    return this.apolicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apolicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApoliceDto: UpdateApoliceDto) {
    return this.apolicesService.update(+id, updateApoliceDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: StatusApolice,
  ) {
    return this.apolicesService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apolicesService.remove(+id);
  }
}
