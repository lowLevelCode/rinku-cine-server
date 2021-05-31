import { Module } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { EmployeeTypeController } from './employee-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeTypeRepository } from './entities/employee-type.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([EmployeeTypeRepository])
  ],
  controllers: [EmployeeTypeController],
  providers: [EmployeeTypeService]
})
export class EmployeeTypeModule {}
