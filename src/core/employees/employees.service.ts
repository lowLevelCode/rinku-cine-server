import { BadRequestException, Injectable } from '@nestjs/common';
import { IPaginationMeta, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { EmployeeRol, EmployeeRolRepository } from '../employee-rol/entities/employee-rol.entity';
import { EmployeeType, EmployeeTypeRepository } from '../employee-type/entities/employee-type.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { EmployeeRepository } from "./entities/employee.repository";

@Injectable()
export class EmployeesService {

  constructor(
    private readonly _employeesRepository:EmployeeRepository){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const {telefono,email,curp,rfc} = createEmployeeDto;
    const employeeExist = await this._employeesRepository.findOne({
      where:[ {telefono}, {email}, {curp}, {rfc} ]
    });

    if(employeeExist)
      throw new BadRequestException("Ya existe un empleado con unos de estos datos registrados: [telefono,email,curp,rfc]");

    return this._employeesRepository.save(createEmployeeDto);
  }

  findByPagination(paginationOptions:IPaginationOptions):Promise<Pagination<Employee,IPaginationMeta>> {
    return this._employeesRepository.findAllPagination(paginationOptions);
  }

  findAll() {
    return this._employeesRepository.find({relations:["employeeType","employeeRol"]});
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
