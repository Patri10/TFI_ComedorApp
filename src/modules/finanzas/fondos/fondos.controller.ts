import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FondosService } from './fondos.service';
import { FundType } from './domain/model/fund-type.enum';

@Controller('fondos')
export class FondosController {
  constructor(private readonly fondosService: FondosService) { }

  @Get()
  findAll() {
    return this.fondosService.findAll();
  }

  @Get('types')
  getFundTypes() {
    return Object.values(FundType);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fondosService.findOne(id);
  }

  @Post(':id/recharge')
  rechargeFund(@Param('id') id: string, @Body() body: { amount: number }) {
    return this.fondosService.rechargeFund(id, body.amount);
  }
}
