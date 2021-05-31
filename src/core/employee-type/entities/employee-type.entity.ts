import { BaseIdEntity } from "src/base/base-id.entity";
import { Employee } from "src/core/employees/entities/employee.entity";
import { Column, Entity, EntityRepository, OneToMany, Repository } from "typeorm";

@Entity()
export class EmployeeType extends BaseIdEntity {
    @Column()
    name:string;

    @OneToMany(() => Employee, employee => employee.employeeType)
    employees: Employee[];
}

@EntityRepository(EmployeeType)
export class EmployeeTypeRepository extends Repository<EmployeeType> {}