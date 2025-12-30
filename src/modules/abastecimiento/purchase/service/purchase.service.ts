import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { PurchaseRepository } from "../../purchase/domain/contract/purchase.respository";
import type { SupplierRepository } from '../../suppliers/domain/contract/supplier.respository';
import type { PurchaseDetailsRepository } from "../domain/contract/purchase_details.repository";
import Purchase from "../domain/model/purchase";
import UpdatePurchaseCommandDto from "./dto/UpdatePurchaseCommand.dto";
import PurchaseDetail from "../domain/model/purchase_details";

@Injectable()
export class PurchaseService {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('SupplierRepository')
        private readonly supplierRepository: SupplierRepository,
        @Inject('PurchaseDetailsRepository')
        private readonly purchaseDetailsRepository: PurchaseDetailsRepository,
    ) { }

<<<<<<< Updated upstream
    // Métodos de Purchase
=======
    
>>>>>>> Stashed changes
    async createPurchase(purchase: Purchase): Promise<Purchase> {
        return await this.purchaseRepository.createPurchase(purchase);
    }

    async findAllPurchases(): Promise<Purchase[]> {
        return await this.purchaseRepository.findAllPurchases();
    }

    async updatePurchase(updatePurchaseDto: UpdatePurchaseCommandDto): Promise<Purchase> {
        return await this.purchaseRepository.updatePurchase(updatePurchaseDto);
    }

    async deletePurchase(id: string): Promise<void> {
        await this.purchaseRepository.deletePurchase(id);
    }

<<<<<<< Updated upstream
    // Métodos de PurchaseDetails
    async createPurchaseDetail(purchaseDetail: PurchaseDetail): Promise<PurchaseDetail> {
        return await this.purchaseDetailsRepository.createPurchaseDetail(purchaseDetail);
    }

    async findPurchaseDetailById(id: string): Promise<PurchaseDetail> {
        const purchaseDetail = await this.purchaseDetailsRepository.findPurchaseDetailById(id);
        if (!purchaseDetail) {
            throw new NotFoundException(`Purchase detail with id ${id} not found`);
        }
        return purchaseDetail;
    }

    async findAllPurchaseDetails(): Promise<PurchaseDetail[]> {
        return await this.purchaseDetailsRepository.findAllPurchaseDetails();
    }

    async updatePurchaseDetail(purchaseDetail: PurchaseDetail): Promise<PurchaseDetail> {
        // Verificar que exista el detalle antes de actualizar
        await this.findPurchaseDetailById(purchaseDetail.getId()!);
        return await this.purchaseDetailsRepository.updatePurchaseDetail(purchaseDetail);
    }

    async deletePurchaseDetail(id: string): Promise<void> {
        // Verificar que exista el detalle antes de eliminar
        await this.findPurchaseDetailById(id);
        await this.purchaseDetailsRepository.deletePurchaseDetail(id);
    }
=======
    

   

  
>>>>>>> Stashed changes
}