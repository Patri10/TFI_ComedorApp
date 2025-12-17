import { Inject, Injectable } from '@nestjs/common';
import type { PurchaseRepository } from '../../purchase/domain/contract/purchase.respository';
import type { PurchaseDetailsRepository } from '../domain/contract/purchase_details.repository';
import Purchase from '../domain/model/purchase';
import PurchaseDetail from '../domain/model/purchase_details';
import UpdatePurchaseCommandDto from './dto/UpdatePurchaseCommand.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('PurchaseRepository')
    private readonly purchaseRepository: PurchaseRepository,
    @Inject('PurchaseDetailsRepository')
    private readonly purchaseDetailsRepository: PurchaseDetailsRepository,
  ) {}

  async createPurchase(
    supplier_id: string,
    fund_id: string,
    total_amount: number,
    invoice_number: string,
    purchase_details: PurchaseDetail[],
  ): Promise<Purchase> {
    const purchase = new Purchase(
      supplier_id,
      fund_id,
      new Date(),
      total_amount,
      invoice_number,
      purchase_details,
      randomUUID(),
    );
    return this.purchaseRepository.createPurchase(purchase);
  }

  async findAllPurchases(): Promise<Purchase[]> {
    return this.purchaseRepository.findAllPurchases();
  }

  async updatePurchase(updateDto: UpdatePurchaseCommandDto): Promise<Purchase> {
    return this.purchaseRepository.updatePurchase(updateDto);
  }

  async deletePurchase(id: string): Promise<void> {
    return this.purchaseRepository.deletePurchase(id);
  }

  async createPurchaseDetail(
    purchaseDetail: PurchaseDetail,
  ): Promise<PurchaseDetail> {
    return this.purchaseDetailsRepository.createPurchaseDetail(purchaseDetail);
  }

  async findPurchaseDetailById(id: string): Promise<PurchaseDetail | null> {
    return this.purchaseDetailsRepository.findPurchaseDetailById(id);
  }

  async findAllPurchaseDetails(): Promise<PurchaseDetail[]> {
    return this.purchaseDetailsRepository.findAllPurchaseDetails();
  }

  async updatePurchaseDetail(
    purchaseDetail: PurchaseDetail,
  ): Promise<PurchaseDetail> {
    return this.purchaseDetailsRepository.updatePurchaseDetail(purchaseDetail);
  }

  async deletePurchaseDetail(id: string): Promise<void> {
    return this.purchaseDetailsRepository.deletePurchaseDetail(id);
  }
}
