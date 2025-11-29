import { Module } from '@nestjs/common';
import { FondosService } from './fondos.service';
import { FondosController } from './fondos.controller';

@Module({
  controllers: [FondosController],
  providers: [FondosService],
  
})
export class FondosModule {}
