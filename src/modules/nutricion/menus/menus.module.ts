import { Module } from '@nestjs/common';
import { MenusService } from './service/menus.service';
import { MenusController } from './presentation/menus.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { SupabaseMenuRepository } from './infrastructure/supabase.menu.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [MenusController],
  providers: [
    MenusService,
    {
      provide: 'MENU_REPOSITORY',
      useClass: SupabaseMenuRepository,
    },
  ],
  exports: [MenusService],
})
export class MenusModule { }
