import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SupabaseComprasRepository } from './purchase/infrastructure/supabase.compras.repository';
import { SupabasePurchaseDetailsRepository } from './purchase/infrastructure/supabase.purchase_details.repository';
import { PurchaseService } from './purchase/service/purchase.service';
// TODO: Uncomment when PurchaseController is implemented
// import {PurchaseController} from './purchase/presentation/purchase.controller';

// TODO: Uncomment when Supplier module is implemented
// import {SupabaseSupplierRepository} from './suppliers/infrastructure/supabase.supplier.repository';
// import {SupplierService} from './suppliers/service/supplier.service';
// import {SupplierController} from './suppliers/presentation/supplier.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    // TODO: Uncomment when controllers are implemented
    // PurchaseController,
    // SupplierController
  ],
  providers: [
    PurchaseService,
    // TODO: Uncomment when SupplierService is implemented
    // SupplierService,
    {
      provide: 'PurchaseRepository',
      useClass: SupabaseComprasRepository,
    },
    {
      provide: 'PurchaseDetailsRepository',
      useClass: SupabasePurchaseDetailsRepository,
    },
    // TODO: Uncomment when SupplierRepository is implemented
    // {
    //   provide: 'SupplierRepository',
    //   useClass: SupabaseSupplierRepository,
    // },
  ],
})
export class AbastecimientoModule {}
