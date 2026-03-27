import { Module } from '@nestjs/common';
import { FacturasService } from './service/facturas.service';
import { FacturasController } from './presentation/facturas.controller';
import { SupabaseFacturaRepository } from './infrastructure/supabase.factura.repository';
import { DatabaseModule } from 'src/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FacturasController],
  providers: [
    FacturasService,
    {
      provide: 'FacturaRepository',
      useClass: SupabaseFacturaRepository,
    },
  ],
  exports: [FacturasService],
})
export class FacturasModule { }
