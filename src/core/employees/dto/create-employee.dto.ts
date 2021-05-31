import {  IsDateString, IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty() nombre: string;
    @IsNotEmpty() apellidos:string;
    @IsDateString()   fechaNacimiento:Date;
    @IsMobilePhone("es-MX") telefono:string;
    @IsEmail() email:string;
    @IsNotEmpty() curp:string;
    @IsNotEmpty() rfc:string;
}
