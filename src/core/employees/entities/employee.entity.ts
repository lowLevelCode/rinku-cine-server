import { BaseIdEntity } from "src/base/base-id.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee extends BaseIdEntity{    

    @Column()
    nombre: string;

    @Column()
    apellidos:string;

    @Column()
    fechaNacimiento:Date;

    @Column()
    telefono:string;

    @Column()
    email:string;

    @Column()
    curp:string;

    @Column()
    rfc:string;
}