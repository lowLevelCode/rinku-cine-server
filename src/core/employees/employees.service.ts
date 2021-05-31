import { Injectable } from '@nestjs/common';
import { EmployeeRol, EmployeeRolRepository } from '../employee-rol/entities/employee-rol.entity';
import { EmployeeType, EmployeeTypeRepository } from '../employee-type/entities/employee-type.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { EmployeeRepository } from "./entities/employee.repository";

@Injectable()
export class EmployeesService {

  constructor(
    private readonly _employeesRepository:EmployeeRepository,
    private readonly _employeeRolRepository:EmployeeRolRepository,
    private readonly _employeeTypeRepository:EmployeeTypeRepository,){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    // Hacemos busqueda de el rol y el typo de emplea para asignarlo
    const idEmployeeRol = createEmployeeDto.idEmployeeRol;
    const idEmployeeType = createEmployeeDto.idEmployeeType;
    const employeeRol:EmployeeRol = await this._employeeRolRepository.findOne(idEmployeeRol);
    const employeeType:EmployeeType = await this._employeeTypeRepository.findOne(idEmployeeType);
    
    let employee:Employee = new Employee();

    // eliminamos estas propiedades para que estos datos no se guarden
    delete createEmployeeDto.idEmployeeRol; 
    delete createEmployeeDto.idEmployeeType;

    Object.assign(employee,createEmployeeDto); // hacemos un mapeo de las propiedades
    
    employee.employeeRol = employeeRol; 
    employee.employeeType = employeeType;

    return this._employeesRepository.save(employee);
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
