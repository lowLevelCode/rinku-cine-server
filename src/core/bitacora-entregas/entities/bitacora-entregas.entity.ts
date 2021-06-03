import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { BaseIdEntity } from "../../../base/base-id.entity";
import { Employee } from "../../../core/employees/entities/employee.entity";
import { Column, Entity, EntityRepository, JoinTable, ManyToMany, Repository } from "typeorm";

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
    cubrioTurno:boolean;

    @ManyToMany(() => Employee, employee => employee.bitacoraEntregas)    
    @JoinTable()
    empleados:Employee[];
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
        .where("empleados.id = :id", { id: idEmployee })
        .orderBy("b.fechaCaptura","DESC");
        return paginate<BitacoraEntregas>(queryBuilder, options);
    }
}