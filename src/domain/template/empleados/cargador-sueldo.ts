import { EmpleadoSueldoTemplate } from "./empleado-sueldo.template-method";

export class CargadorSueldo extends EmpleadoSueldoTemplate {    
    
    /**
     * el cargador recibe $5 por hora como bono.
     * @returns bono
     */
    public calcularBonos(): number {
        return 5 * this.jornadaLaboral;
    }
}