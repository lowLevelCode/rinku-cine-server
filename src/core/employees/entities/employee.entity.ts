import { BaseIdEntity } from "src/base/base-id.entity";
import { BitacoraEntregas } from "src/core/bitacora-entregas/entities/bitacora-entregas.entity";
import { EmployeeRol } from "src/core/employee-rol/entities/employee-rol.entity";
import { EmployeeType } from "src/core/employee-type/entities/employee-type.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee extends BaseIdEntity{    

    @Column()
    nombre: string;

    @Column()
    apellidos:string;

    @Column()
    fechaNacimiento:Date;

    @Column()
    telefono:string;

    @Column()
    email:string;

    @Column()
    curp:string;

    @Column()
    rfc:string;

    @ManyToOne(() => EmployeeType, employeeType => employeeType.employees)
    employeeType: EmployeeType;

    @ManyToOne(() => EmployeeRol, employeeRol => employeeRol.employees)
    employeeRol: EmployeeRol;

    @ManyToMany(() => BitacoraEntregas, bicatora => bicatora.empleados)
    bitacoraEntregas:BitacoraEntregas[];
}