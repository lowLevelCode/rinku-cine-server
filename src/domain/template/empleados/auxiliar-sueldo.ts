import { EmpleadoSueldoTemplate } from "./empleado-sueldo.template-method";

export class AuxiliarSueldo extends EmpleadoSueldoTemplate { 
    /**
     * El auxiliar no recibe bono a menos que cubra turno
     * @returns 0
     */
    public calcularBonos(): number {
        return 0;
    }
}