import { Injectable } from '@nestjs/common';
import { CreateEmployeeRolDto } from './dto/create-employee-rol.dto';
import { UpdateEmployeeRolDto } from './dto/update-employee-rol.dto';
import { EmployeeRolRepository } from './entities/employee-rol.entity';

@Injectable()
export class EmployeeRolService {
  constructor(private readonly _employeeRolRepository: EmployeeRolRepository){}

  create(createEmployeeRolDto: CreateEmployeeRolDto) {
    return this._employeeRolRepository.save(createEmployeeRolDto);
  }

  findAll() {
    return this._employeeRolRepository.find();
  }

  findOne(id: number) {
    return this._employeeRolRepository.findOne(id);
  }

  async update(id: number, updateEmployeeRolDto: UpdateEmployeeRolDto) {
    const employeeRolExist = await this.findOne(id);   
    return this._employeeRolRepository.save({
      ...employeeRolExist,
      ...updateEmployeeRolDto
    });
  }

  remove(id: number) {
    return this._employeeRolRepository.delete(id);
  }
}
