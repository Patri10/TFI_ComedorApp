import { Module } from '@nestjs/common';
import { FondosService } from './fondos.service';
import { FondosController } from './fondos.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { SupabaseFundRepository } from './infrastructure/supabase.fund.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [FondosController],
  providers: [
    FondosService,
    {
      provide: 'FundRepository',
      useClass: SupabaseFundRepository,
    },
  ],
  exports: [FondosService],
})
export class FondosModule { }
