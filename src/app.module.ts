import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FondosModule } from './modules/finanzas/fondos/fondos.module';
import { ProveedoresModule } from './modules/abastecimiento/proveedores/proveedores.module';
import { ComprasModule } from './modules/abastecimiento/compras/compras.module';
import { AlimentosModule } from './modules/inventario/alimentos/alimentos.module';
import { MenusModule } from './modules/nutricion/menus/menus.module';
import { RecetasModule } from './modules/nutricion/recetas/recetas.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FondosModule,
    ProveedoresModule,
    ComprasModule,
    AlimentosModule,
    MenusModule,
    RecetasModule,
    ReportesModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
