import { Module } from '@nestjs/common';
import { RecetasService } from './service/recetas.service';
import { RecetasController } from './presentation/recetas.controller';

@Module({
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule { }
