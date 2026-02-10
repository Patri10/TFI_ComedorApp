import { Inject, Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";
import type { PurchaseRepository } from "../../purchase/domain/contract/purchase.respository";
import type { SupplierRepository } from '../../suppliers/domain/contract/supplier.respository';
import { PurchaseDetailsRepository } from "../domain/contract/purchase_details.repository";
import { CreatePurchaseCommandDto } from "../../purchase/service/dto/CreatePurchaseCommand.dto";
import UpdatePurchaseCommandDto from "../../purchase/service/dto/UpdatePurchaseCommand.dto";
import Purchase from "../domain/model/purchase";
import Purchase_details from "../domain/model/purchase_details";
import { UserRole } from "../../../users/domain/model/user";
import DeletePurchaseCommandDto from "./dto/DeletePurchaseCommand.dto";
import { FondosService } from "../../../finanzas/fondos/fondos.service";

@Injectable()
export class PurchaseService {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('SupplierRepository')
        private readonly supplierRepository: SupplierRepository,
        private readonly fondosService: FondosService

    ) { }

    async createPurchase(dto: CreatePurchaseCommandDto) {
        const existingInvoiceNumber = await this.purchaseRepository.findByInvoiceNumber(dto.getInvoiceNumber());
        if (existingInvoiceNumber) {
            throw new Error('Ya existe una compra con el mismo número de factura');
        }

        // Descontar del fondo seleccionado
        await this.fondosService.deductFromFund(dto.getFundId(), dto.getTotalAmount());

        const purchaseDetails = dto.getPurchaseDetails().map(detail =>
            new Purchase_details(
                '',
                detail.getFoodId(),
                detail.getQuantity(),
                detail.getUnitPrice()
            )
        );

        const purchase = new Purchase(
            dto.getSupplierId(),
            dto.getFundId(),
            new Date(),
            dto.getTotalAmount(),
            dto.getInvoiceNumber(),
            purchaseDetails
        );

        return this.purchaseRepository.createPurchase(purchase);
    }

    async findAllPurchases() {
        return this.purchaseRepository.findAllPurchases();
    }

    async updatePurchase(id: string, dto: UpdatePurchaseCommandDto, userRole: UserRole) {
        // Verificar que la compra existe
        const existingPurchase = await this.purchaseRepository.findById(id);
        if (!existingPurchase) {
            throw new NotFoundException(`Compra con ID ${id} no encontrada`);
        }

        // Validación de permisos basada en roles
        if (userRole === UserRole.ECONOMA || userRole === UserRole.DIRECTORA) {

            if (dto.getFundId() !== undefined ||
                dto.getInvoiceNumber() !== undefined ||
                dto.getTotalAmount() !== undefined ||
                dto.getDate() !== undefined ||
                dto.getPurchaseDetails() !== undefined) {
                throw new ForbiddenException(
                    'Los roles ECONOMA y DIRECTORA solo pueden modificar el proveedor'
                );
            }

            // Si intentan cambiar el proveedor, validar que existe
            if (dto.getSupplierId() !== undefined) {
                const supplier = await this.supplierRepository.findSupplierById(dto.getSupplierId());
                if (!supplier) {
                    throw new NotFoundException(`Proveedor con ID ${dto.getSupplierId()} no encontrado`);
                }
            }

            // Actualizar solo el supplier_id
            const updatedPurchase = new Purchase(
                dto.getSupplierId() ?? existingPurchase.getSupplierId(),
                existingPurchase.getFundId(),
                existingPurchase.getDate(),
                existingPurchase.getTotalAmount(),
                existingPurchase.getInvoiceNumber(),
                existingPurchase.getPurchaseDetails(),
                id
            );

            return this.purchaseRepository.updatePurchase(id, updatedPurchase);
        }

        // ADMIN puede modificar todo
        if (userRole === UserRole.ADMIN) {
            // Validar proveedor si se proporciona
            const supplierId = dto.getSupplierId();
            if (supplierId !== undefined) {
                const supplier = await this.supplierRepository.findSupplierById(supplierId);
                if (!supplier) {
                    throw new NotFoundException(`Proveedor con ID ${supplierId} no encontrado`);
                }
            }

            // Validar detalles si se proporcionan
            const purchaseDetailsFromDto = dto.getPurchaseDetails();
            if (purchaseDetailsFromDto !== undefined) {
                if (purchaseDetailsFromDto.length === 0) {
                    throw new BadRequestException('La compra debe tener al menos un detalle');
                }

                // Validar que el total calculado coincida con el total proporcionado
                const totalAmount = dto.getTotalAmount();
                if (totalAmount !== undefined) {
                    const calculatedTotal = dto.calculateTotal();
                    if (calculatedTotal !== undefined && Math.abs(calculatedTotal - totalAmount) > 0.01) {
                        throw new BadRequestException(
                            `El total proporcionado (${totalAmount}) no coincide con el total calculado (${calculatedTotal})`
                        );
                    }
                }
            }

            // Crear detalles actualizados si se proporcionan
            const purchaseDetails = purchaseDetailsFromDto !== undefined
                ? purchaseDetailsFromDto.map(detail =>
                    new Purchase_details(
                        '',
                        detail.getFoodId(),
                        detail.getQuantity(),
                        detail.getUnitPrice()
                    )
                )
                : existingPurchase.getPurchaseDetails();

            const updatedPurchase = new Purchase(
                dto.getSupplierId() ?? existingPurchase.getSupplierId(),
                dto.getFundId() ?? existingPurchase.getFundId(),
                dto.getDate() ?? existingPurchase.getDate(),
                dto.getTotalAmount() ?? existingPurchase.getTotalAmount(),
                dto.getInvoiceNumber() ?? existingPurchase.getInvoiceNumber(),
                purchaseDetails,
                id
            );

            return this.purchaseRepository.updatePurchase(id, updatedPurchase);
        }

        throw new ForbiddenException('No tienes permisos para realizar esta acción');
    }

    async deletePurchase(deletePurchaseCommandDto: DeletePurchaseCommandDto) {
        const existingPurchase = await this.purchaseRepository.findById(deletePurchaseCommandDto.getId());
        if (!existingPurchase) {
            throw new NotFoundException(`Compra con ID ${deletePurchaseCommandDto.getId()} no encontrada`);
        }
        return this.purchaseRepository.deletePurchase(deletePurchaseCommandDto.getId());
    }
}