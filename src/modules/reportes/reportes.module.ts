import { Module } from '@nestjs/common';
import { ReportesService } from './service/reportes.service';
import { ReportesController } from './presentation/reportes.controller';

@Module({
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule { }
