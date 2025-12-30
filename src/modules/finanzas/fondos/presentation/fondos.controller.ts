import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FondosService } from '../service/fondos.service';


@Controller('fondos')
export class FondosController {
  constructor(private readonly fondosService: FondosService) {}

  @Post()
  /*create(@Body() createFondoDto: CreateFondoDto) {
    return this.fondosService.create(createFondoDto);
  }*/

  @Get()
  findAll() {
    return this.fondosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fondosService.findOne(+id);
  }

  @Patch(':id')
  /*update(@Param('id') id: string, @Body() updateFondoDto: UpdateFondoDto) {
    return this.fondosService.update(+id, updateFondoDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fondosService.remove(+id);
  }
}
