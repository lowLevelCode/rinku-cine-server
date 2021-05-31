import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeRolDto } from './create-employee-rol.dto';

export class UpdateEmployeeRolDto extends PartialType(CreateEmployeeRolDto) {}
