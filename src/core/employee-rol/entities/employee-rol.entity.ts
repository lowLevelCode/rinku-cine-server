import { BaseIdEntity } from "src/base/base-id.entity";
import { BitacoraEntregas } from "src/core/bitacora-entregas/entities/bitacora-entregas.entity";
import { Employee } from "src/core/employees/entities/employee.entity";
import { Column, Entity, EntityRepository, OneToMany, Repository } from "typeorm";

@Entity()
export class EmployeeRol extends BaseIdEntity {

    @Column()
    name:string;

    @Column({nullable:true})
    icon:string;

    @OneToMany(() => Employee, employee => employee.employeeType)
    employees: Employee[];

    @OneToMany(() => BitacoraEntregas, bitacora => bitacora.employeeType)
    bitacoras: BitacoraEntregas[];
}


@EntityRepository(EmployeeRol)
export class EmployeeRolRepository extends Repository<EmployeeRol> {}