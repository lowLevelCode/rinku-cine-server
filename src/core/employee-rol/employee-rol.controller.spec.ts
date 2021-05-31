import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRolController } from './employee-rol.controller';
import { EmployeeRolService } from './employee-rol.service';

describe('EmployeeRolController', () => {
  let controller: EmployeeRolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeRolController],
      providers: [EmployeeRolService],
    }).compile();

    controller = module.get<EmployeeRolController>(EmployeeRolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
