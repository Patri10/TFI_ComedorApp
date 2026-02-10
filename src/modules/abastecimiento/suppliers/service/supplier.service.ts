import { Inject, Injectable } from "@nestjs/common";
import { ConflictException, NotFoundException } from "@nestjs/common/exceptions";
import type { SupplierRepository } from "../domain/contract/supplier.respository";
import Supplier from "../domain/model/supplier.model";
import CreateSupplierCommandDto from "../service/dto/CreateSupplierCommand.dto";
import UpdatePatchSupplierCommandDto from "./dto/UpdateSupplierCommand.dto";
import DeleteSupplierCommandDto from "./dto/DeleteSupplierCommand.dto";
import CreateSupplierRequestDto from "../presentation/dto/CreateSupplierRequest.dto";

@Injectable()
export class SupplierService {
    constructor(
        @Inject('SupplierRepository') private readonly supplierRepository: SupplierRepository
    ) { }

    async createSupplier(dto: CreateSupplierCommandDto) {

        const existingByTaxId = await this.supplierRepository.findSupplierByTaxId(dto.getTaxId());
        if (existingByTaxId) {
            throw new Error('Ya existe un proveedor con el mismo Tax ID');
        }

        const supplier = new Supplier(
            dto.getName(),
            dto.getTaxId(),
            dto.getContact(), 
            dto.getAddress()
        ); 
        return this.supplierRepository.createSupplier(supplier);

    }

    async findAllSuppliers() {
        return this.supplierRepository.findAllSuppliers();
    }

    async updateSupplier(id: string, updateDto: UpdatePatchSupplierCommandDto) {
        const existingSupplier = await this.supplierRepository.findSupplierById(id);
        if (!existingSupplier) {
            throw new NotFoundException('Proveedor no encontrado');
        }

        
        if (updateDto.getTaxId() && updateDto.getTaxId() !== existingSupplier.getTaxId()) {
            const duplicateTaxId = await this.supplierRepository.findSupplierByTaxId(updateDto.getTaxId() ?? existingSupplier.getTaxId());
            if (duplicateTaxId) {
                throw new ConflictException('Ya existe un proveedor con ese Tax ID');
            } 
        }

        const supplier = new Supplier(
            updateDto.getName() ?? existingSupplier.getName(),
            updateDto.getTaxId() ?? existingSupplier.getTaxId(),
            updateDto.getContact() ?? existingSupplier.getContact(),
            updateDto.getAddress() ?? existingSupplier.getAddress(),
            id
        );
        return this.supplierRepository.updateSupplier(id, supplier);
    }

    async deleteSupplier(deleteDto: DeleteSupplierCommandDto) {
        return this.supplierRepository.deleteSupplier(deleteDto);
    }


}