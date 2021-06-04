import { 
    DINERO_ENTREGA_$5, IMPUESTO_ADICIONAL_3_PORCIENTO, 
    IMPUESTO_BASE_9_PORCIENTO, JORNADA_LABORAL_HORAS, SUELDO_$30, 
    SUELDO_MENSUAL_LIMITE_16000, VALES_DESPENSA_4_PORCIENTO 
} from "../../../const/sueldo.config.const";

export abstract class EmpleadoSueldoTemplate {

    protected sueldoPorHora:number = SUELDO_$30;
    protected jornadaLaboral: number = JORNADA_LABORAL_HORAS;
    protected dineroExtraPorCadaEntrega:number = DINERO_ENTREGA_$5;
    protected impuestoBase:number = IMPUESTO_BASE_9_PORCIENTO;
    protected sueldoMensualLimite:number = SUELDO_MENSUAL_LIMITE_16000;
    protected impuestoAdicional:number = IMPUESTO_ADICIONAL_3_PORCIENTO;
    protected cantidadValesDespensa:number = VALES_DESPENSA_4_PORCIENTO;
    
    protected cubrioTurnoTo:CubrioTurnoToEnum;
    protected isSubcontratado:boolean;    

    public getSueldoDiario():number {
        return this.sueldoPorHora * this.jornadaLaboral;
    }

    public getDineroDeEntregasDiario(cantidadEntregas:number):number {
        return this.dineroExtraPorCadaEntrega * cantidadEntregas;
    }

    public getSueldoBrutoDiario(cantidadEntregas:number):number {
        return this.getSueldoDiario() + this.getDineroDeEntregasDiario(cantidadEntregas) + this.calcularBonos();
    }

    public getSueldoNetoMensual(sueldoMensualBruto:number):number {
        return sueldoMensualBruto - this.getCantidadImpuestosRetenerMensual(sueldoMensualBruto);
    }

    public getCantidadImpuestosRetenerMensual(sueldoMensualBruto:number):number {        
        
        const porcentajeImpuesto:number = 
        sueldoMensualBruto > this.sueldoMensualLimite ?
        this.impuestoBase + this.impuestoAdicional : this.impuestoBase;
        
        return (porcentajeImpuesto * sueldoMensualBruto) / 100;
    }    

    public getValesDespensaMensual(sueldoMensualBruto:number):number {
        if(this.isSubcontratado)
            return 0;
        
        return (this.cantidadValesDespensa *  sueldoMensualBruto) / 100;
    }
    
    public setIsExterno(externo:boolean) {
        this.isSubcontratado = externo;
    }

    public setCubrioTurno(cubrio:CubrioTurnoToEnum) {
        this.cubrioTurnoTo = cubrio;
    }

    public getCubrioTurno():CubrioTurnoToEnum {
        return this.cubrioTurnoTo;
    }

    public abstract calcularBonos(): number;        
}

export enum CubrioTurnoToEnum {
    CHOFER = 'CHOFER',
    CARGARDOR = 'CARGARDOR'
}