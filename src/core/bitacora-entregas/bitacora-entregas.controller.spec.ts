import { Test, TestingModule } from '@nestjs/testing';
import { BitacoraEntregasController } from './bitacora-entregas.controller';
import { BitacoraEntregasService } from './bitacora-entregas.service';

describe('BitacoraEntregasController', () => {
  let controller: BitacoraEntregasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BitacoraEntregasController],
      providers: [BitacoraEntregasService],
    }).compile();

    controller = module.get<BitacoraEntregasController>(BitacoraEntregasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
