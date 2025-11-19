import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FondosModule } from '../src/modules/finanzas/fondos/fondos.module';
import { ProveedoresModule } from '../src/modules/abastecimiento/proveedores/proveedores.module';
import { ComprasModule } from '../src/modules/abastecimiento/compras/compras.module';
import { AlimentosModule } from '../src/modules/inventario/alimentos/alimentos.module';
import { MenusModule } from '../src/modules/nutricion/menus/menus.module';
import { RecetasModule } from '../src/modules/nutricion/recetas/recetas.module';
import { ReportesModule } from './modules/reportes/reportes.module';

@Module({
  imports: [FondosModule, ProveedoresModule, ComprasModule, AlimentosModule, MenusModule, RecetasModule, ReportesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
