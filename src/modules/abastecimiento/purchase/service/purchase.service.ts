import { Inject, Injectable } from "@nestjs/common";
import { PurchaseRepository } from "../../purchase/domain/contract/purchase.respository";
import {SupplierRepository} from '../../suppliers/domain/contract/supplier.respository';
import { PurchaseDetailsRepository } from "../domain/contract/purchase_details.repository";

@Injectable()
export class PurchaseService {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('SupplierRepository')
        private readonly supplierRepository: SupplierRepository,
        @Inject('PurchaseDetailsRepository')
        private readonly purchaseDetailsRepository: PurchaseDetailsRepository,
    ) {}

    // Aquí irían los métodos del servicio que utilizan los repositorios inyectados
}