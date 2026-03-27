import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FondosModule } from './modules/finanzas/fondos/fondos.module';
import { AlimentosModule } from './modules/inventario/alimentos/alimentos.module';
import { MenusModule } from './modules/nutricion/menus/menus.module';
import { RecetasModule } from './modules/nutricion/recetas/recetas.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AbastecimientoModule } from './modules/abastecimiento/abastecimiento.module';
import { FacturasModule } from './modules/finanzas/facturas/facturas.module';
import { DatabaseModule } from './modules/database/database.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { RolesGuard } from './modules/auth/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Rate limiting: máximo 60 requests por minuto por IP
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    FondosModule,
    AlimentosModule,
    MenusModule,
    RecetasModule,
    ReportesModule,
    UsersModule,
    AuthModule,
    AbastecimientoModule,
    FacturasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule { }
