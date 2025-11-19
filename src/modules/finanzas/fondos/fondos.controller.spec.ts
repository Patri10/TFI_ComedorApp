import { Test, TestingModule } from '@nestjs/testing';
import { FondosController } from './fondos.controller';
import { FondosService } from './fondos.service';

describe('FondosController', () => {
  let controller: FondosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FondosController],
      providers: [FondosService],
    }).compile();

    controller = module.get<FondosController>(FondosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
