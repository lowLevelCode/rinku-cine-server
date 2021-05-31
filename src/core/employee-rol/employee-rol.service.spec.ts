import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRolService } from './employee-rol.service';

describe('EmployeeRolService', () => {
  let service: EmployeeRolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRolService],
    }).compile();

    service = module.get<EmployeeRolService>(EmployeeRolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
