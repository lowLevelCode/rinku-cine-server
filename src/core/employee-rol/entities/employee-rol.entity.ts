import { BaseIdEntity } from "src/base/base-id.entity";
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
}


@EntityRepository(EmployeeRol)
export class EmployeeRolRepository extends Repository<EmployeeRol> {}