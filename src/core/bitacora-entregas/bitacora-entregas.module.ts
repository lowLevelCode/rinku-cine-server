import { Module } from '@nestjs/common';
import { BitacoraEntregasService } from './bitacora-entregas.service';
import { BitacoraEntregasController } from './bitacora-entregas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BitacoraEntregasRepository } from './entities/bitacora-entregas.entity';
import { EmployeeRepository } from '../employees/entities/employee.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      BitacoraEntregasRepository,
      EmployeeRepository
    ])
  ],
  controllers: [BitacoraEntregasController],
  providers: [BitacoraEntregasService]
})
export class BitacoraEntregasModule {}
