import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComprasService } from './compras.service';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}


  @Get()
  findAll() {
    return this.comprasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comprasService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comprasService.remove(+id);
  }
}
