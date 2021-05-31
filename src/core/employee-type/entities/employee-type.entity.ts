import { BaseIdEntity } from "src/base/base-id.entity";
import { Column, Entity, EntityRepository, Repository } from "typeorm";

@Entity()
export class EmployeeType extends BaseIdEntity {
    @Column()
    name:string;
}

@EntityRepository(EmployeeType)
export class EmployeeTypeRepository extends Repository<EmployeeType> {}