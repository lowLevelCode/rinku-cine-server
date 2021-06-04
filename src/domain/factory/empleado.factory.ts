import { EmployeeRolEnum } from "src/enums/employee-rol.enum";
import { AuxiliarSueldo } from "../template/empleados/auxiliar-sueldo";
import { CargadorSueldo } from "../template/empleados/cargador-sueldo";
import { ChoferSueldo } from "../template/empleados/chofer-sueldo";
import { CubrioTurnoToEnum, EmpleadoSueldoTemplate } from "../template/empleados/empleado-sueldo.template-method";

export class EmpleadoSueldoFactory {    
    static createEmpleado(idRol:number, cubrio:CubrioTurnoToEnum):EmpleadoSueldoTemplate {        
        if(idRol === EmployeeRolEnum.CHOFER)
            return new ChoferSueldo();
        if(idRol === EmployeeRolEnum.CARGARDOR)
            return new CargadorSueldo();
        if(idRol === EmployeeRolEnum.AUXILIAR){
            switch (cubrio) {
                case CubrioTurnoToEnum.CHOFER:
                    return new ChoferSueldo();
                case CubrioTurnoToEnum.CARGARDOR:
                    return new CargadorSueldo();
                default:
                    return new AuxiliarSueldo();
            }
        }
    }
}