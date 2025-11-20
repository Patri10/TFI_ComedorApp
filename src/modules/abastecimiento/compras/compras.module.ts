import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './presentation/compras.controller';

@Module({
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule { }
