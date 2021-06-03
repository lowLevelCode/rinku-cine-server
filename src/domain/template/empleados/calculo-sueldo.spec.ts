import { BONO_CHOFER_$10, DINERO_ENTREGA_$5, IMPUESTO_ADICIONAL_3_PORCIENTO, IMPUESTO_BASE_9_PORCIENTO, JORNADA_LABORAL_HORAS, SUELDO_$30, SUELDO_MENSUAL_LIMITE_16000, VALES_DESPENSA_4_PORCIENTO } from "../../../const/sueldo.config.const";
import { AuxiliarSueldo } from "./auxiliar-sueldo";
import { CargadorSueldo } from "./cargador-sueldo";
import { ChoferSueldo } from "./chofer-sueldo";
import { CubrioTurnoToEnum } from "./empleado-sueldo.template-method";

describe('Calculo de sueldo diario por empleado', () => {  

    describe('Chofer -> cantidad entrega:10',() => {

        let chofer = new ChoferSueldo();

        it('Sueldo diario -> deberia de ser: 240', () => {
            expect(chofer.getSueldoDiario()).toBe(240);
        });

        it('Dinero de entregas diario -> deberia de ser: 50', () => {
            expect(chofer.getDineroDeEntregasDiario(10)).toBe(50);
        });

        it('Dinero de bonos diario -> deberia de ser:80', () => {
            expect(chofer.calcularBonos()).toBe(80);
        });

        it('Sueldo Bruto diario -> deberia de ser:370', () => {
            expect(chofer.getSueldoBrutoDiario(10)).toBe(370);
        });
        
        it('Cantidad de vales de despensa al mes por un sueldo de 10,000 -> deberia de ser:400', () => {
            expect(chofer.getValesDespensaMensual(10000)).toBe(400);
        });

        it('Cantidad de vales de despensa al mes por un sueldo de 10,000 -> deberia de ser: 0 para un externo', () => {
            chofer.setIsExterno(true);
            expect(chofer.getValesDespensaMensual(10000)).toBe(0);
        });

        it('Cantidad impuesto retenidos al mes por un sueldo de 10,000 -> deberia de ser:900', () => {
            expect(chofer.getCantidadImpuestosRetenerMensual(10000)).toBe(900);
        });
        

        it('Cantidad impuesto retenidos al mes por un sueldo de 17,000 -> deberia de ser:2040', () => {
            expect(chofer.getCantidadImpuestosRetenerMensual(17000)).toBe(2040);
        });

        it('Sueldo neto al mes por un sueldo de 10,000 -> deberia de ser:9100', () => {
            expect(chofer.getSueldoNetoMensual(10000)).toBe(9100);
        });

        it('Sueldo neto al mes por un sueldo de 17,000 -> deberia de ser:14960', () => {
            expect(chofer.getSueldoNetoMensual(17000)).toBe(14960);
        });
    });

    describe('Cargador -> cantidad entrega:10',() => {

        let cargador = new CargadorSueldo();

        it('Sueldo diario -> deberia de ser: 240', () => {
            expect(cargador.getSueldoDiario()).toBe(240);
        });

        it('Dinero de entregas diario -> deberia de ser: 50', () => {
            expect(cargador.getDineroDeEntregasDiario(10)).toBe(50);
        });

        it('Dinero de bonos diario -> deberia de ser:40', () => {
            expect(cargador.calcularBonos()).toBe(40);
        });

        it('Sueldo Bruto diario -> deberia de ser:330', () => {
            expect(cargador.getSueldoBrutoDiario(10)).toBe(330);
        });
        
        it('Cantidad de vales de despensa al mes por un sueldo de 10,000 -> deberia de ser:400', () => {
            expect(cargador.getValesDespensaMensual(10000)).toBe(400);
        });

        it('Cantidad de vales de despensa al mes por un sueldo de 10,000 -> deberia de ser: 0 para un externo', () => {
            cargador.setIsExterno(true);
            expect(cargador.getValesDespensaMensual(10000)).toBe(0);
        });

        it('Cantidad impuesto retenidos al mes por un sueldo de 10,000 -> deberia de ser:900', () => {
            expect(cargador.getCantidadImpuestosRetenerMensual(10000)).toBe(900);
        });
        

        it('Cantidad impuesto retenidos al mes por un sueldo de 17,000 -> deberia de ser:2040', () => {
            expect(cargador.getCantidadImpuestosRetenerMensual(17000)).toBe(2040);
        });

        it('Sueldo neto al mes por un sueldo de 10,000 -> deberia de ser:9100', () => {
            expect(cargador.getSueldoNetoMensual(10000)).toBe(9100);
        });

        it('Sueldo neto al mes por un sueldo de 17,000 -> deberia de ser:14960', () => {
            expect(cargador.getSueldoNetoMensual(17000)).toBe(14960);
        });
    });

    describe('Auxiliar -> cantidad entrega:10',() => {

        let auxiliar = new AuxiliarSueldo();

        it('Sueldo diario -> deberia de ser: 240', () => {
            expect(auxiliar.getSueldoDiario()).toBe(240);
        });

        it('Dinero de entregas diario -> deberia de ser: 50', () => {
            expect(auxiliar.getDineroDeEntregasDiario(10)).toBe(50);
        });

        it('Dinero de bonos diario -> deberia de ser:0', () => {
            expect(auxiliar.calcularBonos()).toBe(0);
        });
        
        it('Dinero de bonos diario en caso de cubrir chofer -> deberia de ser:80', () => {
            const cubrioChofer:CubrioTurnoToEnum  = CubrioTurnoToEnum.CHOFER;
            auxiliar.setCubrioTurno(cubrioChofer);

            /** 
             * algun factory
            */
           if(auxiliar.getCubrioTurno() === CubrioTurnoToEnum.CHOFER)
            auxiliar = new ChoferSueldo();

            expect(auxiliar.calcularBonos()).toBe(80);

            auxiliar = new AuxiliarSueldo();
        });


        it('Dinero de bonos diario en caso de cubrir cargador -> deberia de ser:40', () => {
            const cubrioCargador:CubrioTurnoToEnum  = CubrioTurnoToEnum.CARGARDOR;
            auxiliar.setCubrioTurno(cubrioCargador);

            /** 
             * algun factory
            */
           if(auxiliar.getCubrioTurno() === CubrioTurnoToEnum.CARGARDOR)
            auxiliar = new CargadorSueldo();

            expect(auxiliar.calcularBonos()).toBe(40);

            auxiliar = new AuxiliarSueldo();
        });

        it('Sueldo Bruto diario -> deberia de ser:290', () => {
            expect(auxiliar.getSueldoBrutoDiario(10)).toBe(290);
        });
        
        it('Cantidad de vales de despensa al mes por un sueldo de 10,000 -> deberia de ser:400', () => {
            expect(auxiliar.getValesDespensaMensual(10000)).toBe(400);
        });

        it('Cantidad de vales de despensa al mes por un sueldo de 10,000 -> deberia de ser: 0 para un externo', () => {
            auxiliar.setIsExterno(true);
            expect(auxiliar.getValesDespensaMensual(10000)).toBe(0);
        });

        it('Cantidad impuesto retenidos al mes por un sueldo de 10,000 -> deberia de ser:900', () => {
            expect(auxiliar.getCantidadImpuestosRetenerMensual(10000)).toBe(900);
        });
        

        it('Cantidad impuesto retenidos al mes por un sueldo de 17,000 -> deberia de ser:2040', () => {
            expect(auxiliar.getCantidadImpuestosRetenerMensual(17000)).toBe(2040);
        });

        it('Sueldo neto al mes por un sueldo de 10,000 -> deberia de ser:9100', () => {
            expect(auxiliar.getSueldoNetoMensual(10000)).toBe(9100);
        });

        it('Sueldo neto al mes por un sueldo de 17,000 -> deberia de ser:14960', () => {
            expect(auxiliar.getSueldoNetoMensual(17000)).toBe(14960);
        });
    });
});
