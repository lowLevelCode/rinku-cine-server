import { Injectable } from '@nestjs/common';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { UpdateEmployeeTypeDto } from './dto/update-employee-type.dto';
import { EmployeeTypeRepository } from './entities/employee-type.entity';

@Injectable()
export class EmployeeTypeService {
  
  constructor(private readonly _employeeTypeRepository:EmployeeTypeRepository){}

  create(createEmployeeTypeDto: CreateEmployeeTypeDto) {
    return this._employeeTypeRepository.save(createEmployeeTypeDto);
  }

  findAll() {
    return this._employeeTypeRepository.find();
  }

  findOne(id: number) {
    return this._employeeTypeRepository.findOne(id);
  }

  async update(id: number, updateEmployeeTypeDto: UpdateEmployeeTypeDto) {
    const employeeTypeExist = await this.findOne(id);   
    return this._employeeTypeRepository.save({
      ...employeeTypeExist,
      ...updateEmployeeTypeDto
    });
  }

  remove(id: number) {
    return this._employeeTypeRepository.delete(id);
  }
}
