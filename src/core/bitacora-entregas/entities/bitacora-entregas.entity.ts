import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { BaseIdEntity } from "src/base/base-id.entity";
import { Employee } from "src/core/employees/entities/employee.entity";
import { Column, Entity, EntityRepository, Index, JoinTable, ManyToMany, Repository } from "typeorm";

@Entity()
export class BitacoraEntregas extends BaseIdEntity {
    @Column()
    folio:string;

    @Column()
    @Index({unique: true})
    fechaCaptura:Date;

    @Column()
    cantidadEntregas:number;

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
}