import { Module } from '@nestjs/common';
import { NominaService } from './nomina.service';
import { NominaController } from './nomina.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { BitacoraEntregasRepository } from '../bitacora-entregas/entities/bitacora-entregas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BitacoraEntregasRepository])],
  controllers: [NominaController],
  providers: [NominaService]
})
export class NominaModule {}
