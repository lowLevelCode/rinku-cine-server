import { PartialType } from '@nestjs/swagger';
import { CreateBitacoraEntregasDto } from './create-bitacora-entregas.dto';

export class UpdateBitacoraEntregasDto extends PartialType(CreateBitacoraEntregasDto) {}
