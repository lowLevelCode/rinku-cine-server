import { Injectable } from '@nestjs/common';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { UpdateEmployeeTypeDto } from './dto/update-employee-type.dto';

@Injectable()
export class EmployeeTypeService {
  create(createEmployeeTypeDto: CreateEmployeeTypeDto) {
    return 'This action adds a new employeeType';
  }

  findAll() {
    return `This action returns all employeeType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeType`;
  }

  update(id: number, updateEmployeeTypeDto: UpdateEmployeeTypeDto) {
    return `This action updates a #${id} employeeType`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeType`;
  }
}
