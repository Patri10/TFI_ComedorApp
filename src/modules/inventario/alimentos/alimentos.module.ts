import { Module } from '@nestjs/common';
import { AlimentosService } from './service/alimentos.service';
import { AlimentosController } from './presentation/alimentos.controller';

@Module({
  controllers: [AlimentosController],
  providers: [AlimentosService],
})
export class AlimentosModule { }
