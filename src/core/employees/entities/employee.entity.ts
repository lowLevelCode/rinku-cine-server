import { BaseIdCreatedActiveEntity } from "src/base/base-id-created-active.entity";
import { BitacoraEntregas } from "src/core/bitacora-entregas/entities/bitacora-entregas.entity";
import { EmployeeRol } from "src/core/employee-rol/entities/employee-rol.entity";
import { EmployeeType } from "src/core/employee-type/entities/employee-type.entity";
import { Column, Entity, ManyToMany, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class Employee extends BaseIdCreatedActiveEntity {    

    @Column()
    nombre: string;

    @Column()
    apellidos:string;

    @Column()
    telefono:string;

    @Column()
    email:string;

    @Column()
    curp:string;

    @Column()
    rfc:string;

    @Column()
    employeeTypeId: number;

    @Column()
    employeeRolId: number;

    @ManyToOne(() => EmployeeType, employeeType => employeeType.employees)
    @JoinColumn({name:'employeeTypeId', referencedColumnName: 'id'})
    employeeType: EmployeeType;

    @ManyToOne(() => EmployeeRol, employeeRol => employeeRol.employees)
    @JoinColumn({name:'employeeRolId', referencedColumnName: 'id'})
    employeeRol: EmployeeRol;
    
    @OneToMany(() => BitacoraEntregas, bicatora => bicatora.empleados)
    bitacoraEntregas:BitacoraEntregas[];
}