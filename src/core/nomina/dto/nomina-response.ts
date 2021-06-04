export class NominaResponse {
    idEmployee:number;
    sueldoBruto:number;
    gananciasPorEntrega:number;
    cantidadEnBonos:number;
    sueldoNeto:number;
    impuestosRetenidos:number;

    constructor() {
        this.sueldoBruto= 0;
        this.gananciasPorEntrega= 0;
        this.cantidadEnBonos= 0;
        this.sueldoNeto= 0;
        this.impuestosRetenidos= 0;
    }
}