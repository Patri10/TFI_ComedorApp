import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FondosService } from '../service/fondos.service';
import { FundType } from '../domain/model/fund-type.enum';

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

  @Post()
  createFund(@Body() body: { month: number; year: number; amount: number; fundType: string }) {
    // Map frontend enum keys to actual DB enum values
    const fundTypeMap: Record<string, FundType> = {
      GENERAL: FundType.GENERAL,
      NUTRICION: FundType.NUTRICION,
      general: FundType.GENERAL,
      nutrition: FundType.NUTRICION,
    };
    const resolvedType = fundTypeMap[body.fundType] ?? FundType.GENERAL;
    return this.fondosService.createFund(body.month, body.year, body.amount, resolvedType);
  }

  @Post(':id/recharge')
  rechargeFund(@Param('id') id: string, @Body() body: { amount: number }) {
    return this.fondosService.rechargeFund(id, body.amount);
  }
}
