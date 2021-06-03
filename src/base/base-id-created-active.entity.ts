import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseIdCreatedActiveEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn() 
    createdAt: Date;

    @UpdateDateColumn() 
    updatedAt: Date;
    
    @Column({ default: true })
    isActive: boolean;
}