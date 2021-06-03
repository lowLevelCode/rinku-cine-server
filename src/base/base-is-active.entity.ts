import { Column } from "typeorm";

export class BaseIsActiveEntity {
    @Column({ default: true })
    isActive: boolean;
}