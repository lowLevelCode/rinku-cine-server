import { Injectable } from '@nestjs/common';
import { BitacoraEntregasRepository } from '../bitacora-entregas/entities/bitacora-entregas.entity';
import * as moment from "moment";
import { Between } from 'typeorm';
import { CubrioTurnoToEnum, EmpleadoSueldoTemplate } from 'src/domain/template/empleados/empleado-sueldo.template-method';
import { EmpleadoSueldoFactory } from 'src/domain/factory/empleado.factory';
import { NominaResponse } from './dto/nomina-response';

@Injectable()
export class NominaService {

    constructor(private readonly _bitacoraEntregasRepository: BitacoraEntregasRepository){}

    async calcularNominaPorEmpleado(idEmployee:number, anio:string, mes:string):Promise<NominaResponse> {
        const diasMesCount = moment().month(mes).daysInMonth();
        const fechaInicio = moment([anio, mes,1]).format('YYYY-MM-DD');
        const fechaFin = moment([anio, mes,diasMesCount]).format('YYYY-MM-DD');        
        const datosBitacora = await this._bitacoraEntregasRepository.find({
            where:[
                {idEmployee, fechaCaptura: Between(fechaInicio,fechaFin)}
            ]
        });

        if(datosBitacora.length === 0) {
            return null;
        }

        let empleado:EmpleadoSueldoTemplate;
        let nominaResponse = new NominaResponse();

        const parallel = datosBitacora.map(async (bitacora)=> {
            empleado = EmpleadoSueldoFactory.createEmpleado(
                bitacora.rolId, bitacora.cubrioTurnoTo as CubrioTurnoToEnum
            );
            nominaResponse.idEmployee = bitacora.idEmployee;
            nominaResponse.gananciasPorEntrega += empleado.getDineroDeEntregasDiario(bitacora.cantidadEntregas);
            nominaResponse.sueldoBruto += empleado.getSueldoBrutoDiario(bitacora.cantidadEntregas);
            nominaResponse.cantidadEnBonos += empleado.calcularBonos();            
        });

        await Promise.all(parallel);

        nominaResponse.sueldoNeto = empleado.getSueldoNetoMensual(nominaResponse.sueldoBruto);
        nominaResponse.impuestosRetenidos = empleado.getCantidadImpuestosRetenerMensual(nominaResponse.sueldoBruto);

        return nominaResponse;
    }
}
