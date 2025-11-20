import { Module } from '@nestjs/common';
import { FondosService } from './service/fondos.service';
import { FondosController } from './presentation/fondos.controller';

@Module({
  controllers: [FondosController],
  providers: [FondosService],
})
export class FondosModule { }
