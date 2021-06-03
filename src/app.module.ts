import { Module } from '@nestjs/common';
import { EchoModule } from './echo/echo.module';
import { EmployeesModule } from './core/employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Employee } from './core/employees/entities/employee.entity';
import { EmployeeRolModule } from './core/employee-rol/employee-rol.module';
import { EmployeeTypeModule } from './core/employee-type/employee-type.module';
import { EmployeeRol } from './core/employee-rol/entities/employee-rol.entity';
import { EmployeeType } from './core/employee-type/entities/employee-type.entity';
import { BitacoraEntregasModule } from './core/bitacora-entregas/bitacora-entregas.module';
import { BitacoraEntregas } from './core/bitacora-entregas/entities/bitacora-entregas.entity';
import { NominaModule } from './core/nomina/nomina.module';

const entities = [
  Employee,
  EmployeeRol,
  EmployeeType,
  BitacoraEntregas
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
    }),

    EchoModule, 
    EmployeesModule, EmployeeRolModule, EmployeeTypeModule, BitacoraEntregasModule, NominaModule
  ],
})
export class AppModule {}
