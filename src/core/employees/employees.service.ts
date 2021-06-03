import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationMeta, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
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

  async createMany(createEmployeeDtos:CreateEmployeeDto[]){
    await Promise.all(createEmployeeDtos.map(async (createEmployee)=>{ // busca de forma paralela
      const {telefono,email,curp,rfc} = createEmployee;
      const employeeExist = await this._employeesRepository.findOne({
        where:[ {telefono}, {email}, {curp}, {rfc} ]
      });
  
      if(employeeExist)
        throw new BadRequestException("Ya existe un empleado con unos de estos datos registrados: [telefono,email,curp,rfc]");
    }));

    return this._employeesRepository.save(createEmployeeDtos);
  }

  findByPagination(paginationOptions:IPaginationOptions):Promise<Pagination<Employee,IPaginationMeta>> {
    return this._employeesRepository.findAllPagination(paginationOptions);
  }

  async findOne(id: number) {
    const employeeExist = await this._employeesRepository.findOne(id);
    if(!employeeExist)
      throw new NotFoundException(`No existe un empleado con el id: ${id}`);

    return employeeExist;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) { 
    const employeeExist = await this.findOne(id);   
    return this._employeesRepository.save({
      ...employeeExist,
      ...updateEmployeeDto
    });
  }

  async remove(id: number) {
    const employeeExist = await this.findOne(id);   
    employeeExist.isActive = false;
    return this._employeesRepository.save(employeeExist);
  }
}
