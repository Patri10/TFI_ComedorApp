import { Inject, Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";
import type { PurchaseRepository } from "../../purchase/domain/contract/purchase.respository";
import type { SupplierRepository } from '../../suppliers/domain/contract/supplier.respository';

import { CreatePurchaseCommandDto } from "../../purchase/service/dto/CreatePurchaseCommand.dto";
import UpdatePurchaseCommandDto from "../../purchase/service/dto/UpdatePurchaseCommand.dto";
import Purchase from "../domain/model/purchase";
import Purchase_details from "../domain/model/purchase_details";
import { UserRole } from "../../../users/domain/model/user";
import DeletePurchaseCommandDto from "./dto/DeletePurchaseCommand.dto";
import { FondosService } from "../../../finanzas/fondos/service/fondos.service";
import type { FoodRepository } from "../../../inventario/alimentos/domain/contract/food.repository";
import Food from "../../../inventario/alimentos/domain/model/food";
import { FoodCategory } from "../../../inventario/alimentos/domain/model/food-category.enum";
import { FoodUnit } from "../../../inventario/alimentos/domain/model/food-unit.enum";

@Injectable()
export class PurchaseService {
    constructor(
        @Inject('PurchaseRepository')
        private readonly purchaseRepository: PurchaseRepository,
        @Inject('SupplierRepository')
        private readonly supplierRepository: SupplierRepository,
        @Inject('FoodRepository')
        private readonly foodRepository: FoodRepository,
        private readonly fondosService: FondosService

    ) { }

    async createPurchase(dto: CreatePurchaseCommandDto) {
        // Descontar del fondo
        await this.fondosService.deductFromFund(dto.getFundId(), dto.getTotalAmount());

        const purchaseDetails = await Promise.all(
            dto.getPurchaseDetails().map(async (detail) => {

                const existingFood = await this.foodRepository.findByName(detail.getFoodName());

                let foodId: string;

                if (existingFood) {
                    const updatedFood = new Food(
                        existingFood.name,
                        existingFood.category as FoodCategory,
                        existingFood.unit as FoodUnit,
                        existingFood.stock + detail.getQuantity(),
                        detail.getExpirationDate()
                            ? new Date(detail.getExpirationDate()!)
                            : (existingFood.expiration_date ? new Date(existingFood.expiration_date) : undefined),
                        existingFood.id
                    );
                    await this.foodRepository.updateFood(existingFood.id, updatedFood);
                    foodId = existingFood.id;
                } else {
                    const expirationDate = detail.getExpirationDate()
                        ? new Date(detail.getExpirationDate()!)
                        : undefined;

                    const newFood = new Food(
                        detail.getFoodName(),
                        (detail.getCategory() as FoodCategory) || FoodCategory.OTROS,
                        (detail.getUnit() as FoodUnit) || FoodUnit.KG,
                        detail.getQuantity(),
                        expirationDate
                    );
                    const createdFood = await this.foodRepository.createFood(newFood);
                    foodId = createdFood.id;
                }

                return new Purchase_details(
                    '',
                    foodId,
                    detail.getQuantity(),
                    detail.getUnitPrice(),
                    undefined,
                    detail.getFoodName()
                );
            }),
        );

        // Toda compra nace como 'pendiente' — la factura se carga por separado en /facturas
        const purchase = new Purchase(
            dto.getSupplierId(),
            dto.getFundId(),
            new Date(),
            dto.getTotalAmount(),
            purchaseDetails,
            'pendiente'
        );

        return this.purchaseRepository.createPurchase(purchase);
    }

    async findAllPurchases() {
        return this.purchaseRepository.findAllPurchases();
    }

    async updatePurchase(id: string, dto: UpdatePurchaseCommandDto, userRole: UserRole) {

        const existingPurchase = await this.purchaseRepository.findById(id);
        if (!existingPurchase) {
            throw new NotFoundException(`Compra con ID ${id} no encontrada`);
        }

        if (userRole === UserRole.ECONOMA || userRole === UserRole.DIRECTORA) {

            if (dto.getFundId() !== undefined ||
                dto.getTotalAmount() !== undefined ||
                dto.getDate() !== undefined ||
                dto.getPurchaseDetails() !== undefined) {
                throw new ForbiddenException(
                    'Los roles ECONOMA y DIRECTORA solo pueden modificar el proveedor'
                );
            }

            if (dto.getSupplierId() !== undefined) {
                const supplier = await this.supplierRepository.findSupplierById(dto.getSupplierId());
                if (!supplier) {
                    throw new NotFoundException(`Proveedor con ID ${dto.getSupplierId()} no encontrado`);
                }
            }

            const updatedPurchase = new Purchase(
                dto.getSupplierId() ?? existingPurchase.getSupplierId(),
                existingPurchase.getFundId(),
                existingPurchase.getDate(),
                existingPurchase.getTotalAmount(),
                existingPurchase.getPurchaseDetails(),
                existingPurchase.getStatus(),
                id
            );

            return this.purchaseRepository.updatePurchase(id, updatedPurchase);
        }

        if (userRole === UserRole.ADMIN) {
            // Validar proveedor
            const supplierId = dto.getSupplierId();
            if (supplierId !== undefined) {
                const supplier = await this.supplierRepository.findSupplierById(supplierId);
                if (!supplier) {
                    throw new NotFoundException(`Proveedor con ID ${supplierId} no encontrado`);
                }
            }

            // Validar detalles
            const purchaseDetailsFromDto = dto.getPurchaseDetails();
            if (purchaseDetailsFromDto !== undefined) {
                if (purchaseDetailsFromDto.length === 0) {
                    throw new BadRequestException('La compra debe tener al menos un detalle');
                }

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

            const purchaseDetails = purchaseDetailsFromDto !== undefined
                ? purchaseDetailsFromDto.map(d => new Purchase_details(
                    '',
                    '',
                    d.getQuantity(),
                    d.getUnitPrice(),
                    undefined,
                    ''
                ))
                : existingPurchase.getPurchaseDetails();

            const updatedPurchase = new Purchase(
                dto.getSupplierId() ?? existingPurchase.getSupplierId(),
                dto.getFundId() ?? existingPurchase.getFundId(),
                dto.getDate() ?? existingPurchase.getDate(),
                dto.getTotalAmount() ?? existingPurchase.getTotalAmount(),
                purchaseDetails,
                dto.getStatus() ?? existingPurchase.getStatus(),
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

        // Reintegrar el monto al fondo
        const totalAmount = existingPurchase.getTotalAmount();
        if (totalAmount && totalAmount > 0) {
            await this.fondosService.rechargeFund(existingPurchase.getFundId(), totalAmount);
        }

        return this.purchaseRepository.deletePurchase(deletePurchaseCommandDto.getId());
    }
}