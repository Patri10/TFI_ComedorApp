import { Module } from '@nestjs/common';
import { MenusService } from './service/menus.service';
import { MenusController } from './presentation/menus.controller';

@Module({
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule { }
