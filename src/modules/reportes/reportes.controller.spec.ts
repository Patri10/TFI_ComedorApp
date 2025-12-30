import { Test, TestingModule } from '@nestjs/testing';
import { ReportesController } from './presentation/reportes.controller';
import { ReportesService } from './service/reportes.service';

describe('ReportesController', () => {
  let controller: ReportesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportesController],
      providers: [ReportesService],
    }).compile();

    controller = module.get<ReportesController>(ReportesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
