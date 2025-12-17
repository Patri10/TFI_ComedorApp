import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import {SupabaseComprasRepository} from './purchase/infrastructure/supabase.compras.repository'; 
import {PurchaseService} from './purchase/service/purchase.service';
import {PurchaseController} from './purchase/presentation/purchase.controller';

import {SupabaseSupplierRepository} from './suppliers/infrastructure/supabase.supplier.repository';
import {SupplierService} from './suppliers/service/supplier.service';
import {SupplierController} from './suppliers/presentation/supplier.controller';


@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController, SupplierController],
  providers: [
    PurchaseService,
    SupplierService,
    {
      provide: 'PurchaseRepository',
      useClass: SupabaseComprasRepository,
    },
    {
      provide: 'SupplierRepository',
      useClass: SupabaseSupplierRepository,
    },
  ],
})
export class AbastecimientoModule { }

