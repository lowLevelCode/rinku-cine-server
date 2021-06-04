import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { BaseIdEntity } from "../../../base/base-id.entity";
import { Employee } from "../../../core/employees/entities/employee.entity";
import { Column, Entity, EntityRepository, JoinColumn, JoinTable, ManyToMany, ManyToOne, Repository } from "typeorm";
import { EmployeeType } from "src/core/employee-type/entities/employee-type.entity";
import { EmployeeRol } from "src/core/employee-rol/entities/employee-rol.entity";

@Entity()
export class BitacoraEntregas extends BaseIdEntity {
    @Column()
    folio:string;

    @Column({ type: 'date' })    
    fechaCaptura:Date;

    @Column()
    cantidadEntregas:number;

    @Column()
    rolId:number;

    @Column()
    tipoId:number;

    @Column()
    idEmployee:number;

    @Column({nullable:true})
    cubrioTurnoTo:string;
    
    @ManyToOne(() => Employee, employee => employee.bitacoraEntregas)
    @JoinColumn({name:'idEmployee', referencedColumnName: 'id'})
    empleados:Employee;

    @ManyToOne(() => EmployeeType, employeeType => employeeType.bitacoras)
    @JoinColumn({name:'tipoId', referencedColumnName: 'id'})
    employeeType: EmployeeType;

    @ManyToOne(() => EmployeeRol, employeeType => employeeType.bitacoras)
    @JoinColumn({name:'rolId', referencedColumnName: 'id'})
    employeeRol: EmployeeRol;
}

@EntityRepository(BitacoraEntregas)
export class BitacoraEntregasRepository extends Repository<BitacoraEntregas> {
    async findAllPagination(options: IPaginationOptions): Promise<Pagination<BitacoraEntregas,IPaginationMeta>> {        
        const queryBuilder = this.createQueryBuilder('b')
        .orderBy("b.fechaCaptura","DESC");
        return paginate<BitacoraEntregas>(queryBuilder, options);
    }

    async findAllByEmployeeId(idEmployee:number,options: IPaginationOptions): Promise<Pagination<BitacoraEntregas,IPaginationMeta>> {        
        const queryBuilder = this.createQueryBuilder('b')
        .leftJoin("b.empleados","empleados")
        .leftJoinAndSelect("b.employeeType","employeeType")
        .leftJoinAndSelect("b.employeeRol","employeeRol")
        .where("empleados.id = :id", { id: idEmployee })
        .orderBy("b.fechaCaptura","DESC");
        return paginate<BitacoraEntregas>(queryBuilder, options);
    }
}