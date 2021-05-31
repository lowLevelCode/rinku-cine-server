import { IsNotEmpty } from "class-validator";

export class CreateEmployeeRolDto {
    id?:number;
    
    @IsNotEmpty() 
    name:string;
}
