import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from "./entities/employee.repository";

@Injectable()
export class EmployeesService {

  constructor(private readonly _employeesRepository:EmployeeRepository){}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this._employeesRepository.save(createEmployeeDto);
  }

  findAll() {
    return this._employeesRepository.find();
  }

  findOne(id: number) {
    return this._employeesRepository.findOne(id);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) { 
    const employeeExist = await this.findOne(id);   
    return this._employeesRepository.save({
      ...employeeExist,
      ...updateEmployeeDto
    });
  }

  remove(id: number) {
    return this._employeesRepository.delete(id);
  }
}
