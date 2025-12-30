import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FondosModule } from './modules/finanzas/fondos/fondos.module';
<<<<<<< HEAD
import { ProveedoresModule } from './modules/abastecimiento/proveedores/proveedores.module';
import { ComprasModule } from './modules/abastecimiento/compras/compras.module';
=======
import { AbastecimientoModule } from './modules/abastecimiento/abastecimiento.module';
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
import { AlimentosModule } from './modules/inventario/alimentos/alimentos.module';
import { MenusModule } from './modules/nutricion/menus/menus.module';
import { RecetasModule } from './modules/nutricion/recetas/recetas.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { UsersModule } from './modules/users/users.module';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FondosModule,
    ProveedoresModule,
    ComprasModule,
=======
import { SupabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FondosModule,
    AbastecimientoModule,
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
    AlimentosModule,
    MenusModule,
    RecetasModule,
    ReportesModule,
    UsersModule,
<<<<<<< HEAD
    AuthModule
=======
    SupabaseModule,
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
