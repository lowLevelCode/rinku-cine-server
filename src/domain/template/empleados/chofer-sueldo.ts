import { EmpleadoSueldoTemplate } from "./empleado-sueldo.template-method";

export class ChoferSueldo extends EmpleadoSueldoTemplate {    

    /**
     * Los choferes reciben $10 de bono por hora(jornada laboral)
     * @returns bono
     */
    public calcularBonos(): number {
        return 10 * this.jornadaLaboral;
    }
}