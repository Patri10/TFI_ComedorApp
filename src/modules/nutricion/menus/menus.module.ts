import { Module } from '@nestjs/common';
import { MenusService } from './service/menus.service';
import { MenusController } from './presentation/menus.controller';

import { MenuDetalleService } from './service/menu-detalle.service';
import { MenuDetalleController } from './presentation/menu-detalle.controller';
import { SupabaseMenuDetalleRepository } from './infrastructure/supabase-menu-detalle.repository';

@Module({
  controllers: [MenusController, MenuDetalleController],
  providers: [
    MenusService,
    MenuDetalleService,
    { provide: 'MenuDetalleRepository', useClass: SupabaseMenuDetalleRepository },
  ],
})
export class MenusModule { }
