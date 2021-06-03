import { Body, Controller, Post } from '@nestjs/common';
import { QueryNomina } from './dto/query-nomina';
import { NominaService } from './nomina.service';

@Controller('nomina')
export class NominaController {
  constructor(private readonly nominaService: NominaService) {}

  @Post('calcular')
  calcularNominaPorEmpleado(@Body() query: QueryNomina) {
    return this.nominaService.calcularNominaPorEmpleado(query);
  }
}
