import { Module } from '@nestjs/common';
import { EmployeeRolService } from './employee-rol.service';
import { EmployeeRolController } from './employee-rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRolRepository } from './entities/employee-rol.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([EmployeeRolRepository])
  ],
  controllers: [EmployeeRolController],
  providers: [EmployeeRolService]
})
export class EmployeeRolModule {}
