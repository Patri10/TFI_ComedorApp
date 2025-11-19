import { Test, TestingModule } from '@nestjs/testing';
import { FondosService } from './fondos.service';

describe('FondosService', () => {
  let service: FondosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FondosService],
    }).compile();

    service = module.get<FondosService>(FondosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
