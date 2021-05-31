import { Module } from '@nestjs/common';
import { EchoModule } from './echo/echo.module';
import { EmployeesModule } from './core/employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Employee } from './core/employees/entities/employee.entity';

const entities = [Employee];

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
    EmployeesModule
  ],
})
export class AppModule {}
