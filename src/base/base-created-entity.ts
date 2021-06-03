import { CreateDateColumn, UpdateDateColumn } from "typeorm";


export class BaseCreatedEntity {
    @CreateDateColumn() 
    createdAt: Date;

    @UpdateDateColumn() 
    updatedAt: Date;
}