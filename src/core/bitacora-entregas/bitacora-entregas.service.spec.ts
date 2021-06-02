import { Test, TestingModule } from '@nestjs/testing';
import { BitacoraEntregasService } from './bitacora-entregas.service';

describe('BitacoraEntregasService', () => {
  let service: BitacoraEntregasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitacoraEntregasService],
    }).compile();

    service = module.get<BitacoraEntregasService>(BitacoraEntregasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
