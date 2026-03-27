import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import type { FundRepository } from '../domain/contract/fund.repository';
import Fund from '../domain/model/fund.model';
import { FundType } from '../domain/model/fund-type.enum';

@Injectable()
export class FondosService {

  constructor(
    @Inject('FundRepository') private readonly fundRepository: FundRepository,
  ) { }

  async findAll() {
    return this.fundRepository.findAllFunds();
  }

  async findOne(id: string) {
    return this.fundRepository.findFundById(id);
  }

  async createFund(month: number, year: number, amount: number, fundType: FundType) {
    const fund = new Fund(month, year, amount, amount, fundType);
    return this.fundRepository.createFund(fund);
  }

  async rechargeFund(id: string, amount: number) {
    const fund = await this.fundRepository.findFundById(id);
    if (!fund) throw new NotFoundException('Fondo no encontrado');

    return this.fundRepository.updateInitialAndRemainingAmount(
      id,
      fund.getInitialAmount() + amount,
      fund.getRemainingAmount() + amount,
    );
  }

  async deductFromFund(id: string, amount: number) {
    const fund = await this.fundRepository.findFundById(id);
    if (!fund) throw new NotFoundException('Fondo no encontrado');
    if (!fund.hasAvailableFunds(amount)) throw new BadRequestException('Fondos insuficientes');

    return this.fundRepository.updateRemainingAmount(id, fund.getRemainingAmount() - amount);
  }
}
