import { BaseIdEntity } from "src/base/base-id.entity";
import { Column, Entity, EntityRepository, Repository } from "typeorm";

@Entity()
export class EmployeeRol extends BaseIdEntity {

    @Column()
    name:string;
}


@EntityRepository(EmployeeRol)
export class EmployeeRolRepository extends Repository<EmployeeRol> {}