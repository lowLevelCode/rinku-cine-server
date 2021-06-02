import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BitacoraEntregasService } from './bitacora-entregas.service';
import { CreateBitacoraEntregasDto } from './dto/create-bitacora-entregas.dto';
import { UpdateBitacoraEntregasDto } from './dto/update-bitacora-entregas.dto';

@Controller('bitacora-entregas')
export class BitacoraEntregasController {
  constructor(private readonly bitacoraEntregasService: BitacoraEntregasService) {}

  @Post()
  create(@Body() createBitacoraEntregasDto: CreateBitacoraEntregasDto) {
    return this.bitacoraEntregasService.create(createBitacoraEntregasDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.bitacoraEntregasService.findAll({page,limit});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bitacoraEntregasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBitacoraEntregasDto: UpdateBitacoraEntregasDto) {
    return this.bitacoraEntregasService.update(+id, updateBitacoraEntregasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bitacoraEntregasService.remove(+id);
  }
}
