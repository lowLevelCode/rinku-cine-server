import {  IsDateString, IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty() nombre: string;
    @IsNotEmpty() apellidos:string;
    @IsMobilePhone("es-MX") telefono:string;
    @IsEmail() email:string;
    @IsNotEmpty() curp:string;
    @IsNotEmpty() rfc:string;

    @IsNotEmpty() employeeRolId:number;
    @IsNotEmpty() employeeTypeId:number;
    @IsNotEmpty() isActive:boolean;
}
