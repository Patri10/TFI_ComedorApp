import { Module } from '@nestjs/common';
import { RecetasService } from './service/recetas.service';
import { RecetasController } from './presentation/recetas.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { SupabaseRecetaRepository } from './infrastructure/supabase.receta.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [RecetasController],
  providers: [
    RecetasService,
    {
      provide: 'RECETA_REPOSITORY',
      useClass: SupabaseRecetaRepository,
    },
  ],
  exports: [RecetasService],
})
export class RecetasModule { }
