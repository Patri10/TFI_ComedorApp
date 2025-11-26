import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FondosModule } from './modules/finanzas/fondos/fondos.module';
import { AbastecimientoModule } from './modules/abastecimiento/abastecimiento.module';
import { AlimentosModule } from './modules/inventario/alimentos/alimentos.module';
import { MenusModule } from './modules/nutricion/menus/menus.module';
import { RecetasModule } from './modules/nutricion/recetas/recetas.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { UsersModule } from './modules/users/users.module';
import { SupabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FondosModule,
    AbastecimientoModule,
    AlimentosModule,
    MenusModule,
    RecetasModule,
    ReportesModule,
    UsersModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
