import { Injectable } from '@nestjs/common';
import { BitacoraEntregasRepository } from '../bitacora-entregas/entities/bitacora-entregas.entity';
import { QueryNomina } from './dto/query-nomina';

@Injectable()
export class NominaService {

    constructor(private readonly _bitacoraEntregasRepository: BitacoraEntregasRepository){}

    calcularNominaPorEmpleado(queryNomina:QueryNomina) {
        
    }
}
