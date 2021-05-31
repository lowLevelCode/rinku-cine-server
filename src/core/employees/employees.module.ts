import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from './entities/employee.repository';
import { EmployeeRolRepository } from '../employee-rol/entities/employee-rol.entity';
import { EmployeeTypeRepository } from '../employee-type/entities/employee-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeRepository,
      EmployeeRolRepository, 
      EmployeeTypeRepository
    ]),    
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
