import { EntityRepository, Repository } from "typeorm";
import { Employee } from "./employee.entity";
import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
    
    async findAllPagination(options: IPaginationOptions): Promise<Pagination<Employee,IPaginationMeta>> {        
        const queryBuilder = this.createQueryBuilder('e')
        .leftJoinAndSelect("e.employeeType","employeeType")
        .leftJoinAndSelect("e.employeeRol","employeeRol")
        .where("e.isActive = :isActive", {isActive:true});

        return paginate<Employee>(queryBuilder, options);
    }
}