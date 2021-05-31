import { PrimaryGeneratedColumn } from "typeorm";

/**
 * Esta clase son sirve solo como base para heredar el tipo de identicador en la base de datos.
 * esto nos ayuda para poder cambiar de forma rapida el tipo de identicador de un entidad.
 * Podriamos facilmente cambiar el identicador para que sea de tipo UUID o cambiarlo para mongodb
 */
export class BaseIdEntity {
    @PrimaryGeneratedColumn()
    id: number;
}