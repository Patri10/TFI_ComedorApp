import { Inject, Injectable } from "@nestjs/common";
import type { PurchaseRepository } from "../../purchase/domain/contract/purchase.respository";
import Purchase from "../domain/model/purchase";
import CreatePurchaseCommandDto from "./dto/CreatePurchaseCommand.dto";
import UpdatePurchaseCommandDto from "./dto/UpdatePurchaseCommand.dto";

@Injectable()
export class PurchaseService {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
    ) {}

    async createPurchase(dto: CreatePurchaseCommandDto): Promise<Purchase> {
        const purchase = new Purchase(
            dto.getSupplierId(),
            dto.getFundId(),
            new Date(),
            dto.getTotalAmount(),
            dto.getInvoiceNumber(),
            dto.getPurchaseDetails()
        );
        return this.purchaseRepository.createPurchase(purchase);
    }

    async findAllPurchases(): Promise<Purchase[]> {
        return this.purchaseRepository.findAllPurchases();
    }

    async updatePurchase(id: string, dto: UpdatePurchaseCommandDto): Promise<Purchase> {
        return this.purchaseRepository.updatePurchase(dto);
    }

    async deletePurchase(id: string): Promise<void> {
        return this.purchaseRepository.deletePurchase(id);
    }
}