import { Module } from '@nestjs/common';
import { FoodService } from './service/food.service';
import { FoodController } from './presentation/alimentos.controller';
import { SupabaseFoodRepository } from './infrastructure/supabase.food.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FoodController],
  providers: [
    FoodService,
    {
      provide: 'FoodRepository',
      useClass: SupabaseFoodRepository,
    },
  ],
  exports: [
    FoodService,
    'FoodRepository' // Exportar para que otros módulos puedan inyectarlo
  ],
})
export class AlimentosModule { }
