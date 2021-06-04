import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { NominaService } from './nomina.service';

@Controller('nomina')
export class NominaController {
  constructor(private readonly nominaService: NominaService) {}

  @Get('calcular/employee/:id')
  calcularNominaPorEmpleado(
    @Param('id') id: string,
    @Query('anio') anio: string,
    @Query('mes') mes: string,
    ) {
    return this.nominaService.calcularNominaPorEmpleado(+id,anio,mes);
  }
}
