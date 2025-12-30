import { Module } from '@nestjs/common';
import { FacturasService } from './service/facturas.service';
import { FacturasController } from './presentation/facturas.controller';

@Module({
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule { }
