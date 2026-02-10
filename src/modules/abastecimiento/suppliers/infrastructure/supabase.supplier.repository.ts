import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { HttpStatus, HttpException, Inject } from '@nestjs/common';
import User, { UserRole } from "../../../users/domain/model/user";
import Supplier from "../../suppliers/domain/model/supplier.model";
import { SupplierRepository } from "../../suppliers/domain/contract/supplier.respository";
import UpdatePatchSupplierCommandDto from "../service/dto/UpdateSupplierCommand.dto";
import DeleteSupplierCommandDto from "../service/dto/DeleteSupplierCommand.dto";

@Injectable()
export class SupabaseSupplierRepository implements SupplierRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabaseClient: SupabaseClient,

    ) { }

    async createSupplier(supplier: Supplier): Promise<Supplier> {
        const { data, error } = await this.supabaseClient.from('suppliers').insert({
            name: supplier.getName(),
            tax_id: supplier.getTaxId(),
            contact: supplier.getContact(),
            address: supplier.getAddress(),
        }).select().single();

        if (error) {
            throw new HttpException('Proveedor no creado: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        const supplierCreated = new Supplier(
            data.name,
            data.tax_id,
            data.contact,
            data.address,
            data.id
        );

        console.log("Proveedor creado con exito: " + JSON.stringify(data));
        return supplierCreated;
    }

    async getSupplierById(id: string): Promise<Supplier | null> {
        const { data, error } = await this.supabaseClient.from('suppliers').select('*').eq('id', id).single();

        if (error) {
            throw new HttpException('Error al obtener el proveedor: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        if (!data) {
            return null;
        }

        const supplier = new Supplier(
            data.name,
            data.tax_id,
            data.contact,
            data.address,
            data.id
        );

        return supplier;
    }

    async updateSupplier(id: string, supplier: Supplier): Promise<Supplier> {
        const { data, error } = await this.supabaseClient.from('suppliers').update({
            name: supplier.getName(),
            tax_id: supplier.getTaxId(),
            contact: supplier.getContact(),
            address: supplier.getAddress(),
        }).eq('id', id).select().single();

        if (error) {
            throw new HttpException('Proveedor no actualizado: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        if (!data) {
            throw new HttpException('Proveedor no encontrado', HttpStatus.NOT_FOUND);
        }

        const supplierUpdated = new Supplier(
            data.name,
            data.tax_id,
            data.contact,
            data.address
        );
        console.log("Proveedor actualizado con exito" + JSON.stringify(data))
        return supplierUpdated;
    }

    async deleteSupplier(deleteSupplierCommandDto: DeleteSupplierCommandDto): Promise<void> {
        const { data, error } = await this.supabaseClient.from('suppliers').delete().eq('id', deleteSupplierCommandDto.getId());

        if (error) {
            throw new HttpException('Proveedor no eliminado: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        console.log("Proveedor eliminado con exito" + JSON.stringify(data))
    }

    async findSupplierByName(name: string): Promise<Supplier | null> {
        const { data, error } = await this.supabaseClient.from('suppliers').select('*').eq('name', name).single();

        if (error) {
            throw new HttpException('Error al obtener el proveedor: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        if (!data) {
            return null;
        }

        const supplier = new Supplier(
            data.name,
            data.tax_id,
            data.contact,
            data.address,
            data.id
        );

        return supplier;
    }

    async findAllSuppliers(): Promise<Supplier[]> {
        const { data, error } = await this.supabaseClient.from('suppliers').select('*');

        if (error) {
            throw new HttpException('Error al obtener los proveedores: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        return data.map((s: any) => new Supplier(
            s.name,
            s.tax_id,
            s.contact,
            s.address,
            s.id
        ));
    }

    async findSupplierByTaxId(taxId: string): Promise<Supplier | null> {
        const { data, error } = await this.supabaseClient.from('suppliers').select('*').eq('tax_id', taxId);

        if (error) {
            throw new HttpException('Error al buscar el proveedor: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        if (!data || data.length === 0) {
            return null;
        }

        const supplierData = data[0];
        const supplier = new Supplier(
            supplierData.name,
            supplierData.tax_id,
            supplierData.contact,
            supplierData.address,
            supplierData.id
        );

        return supplier;
    }

    async findSupplierById(id: string): Promise<Supplier | null> {
        const { data, error } = await this.supabaseClient.from('suppliers').select('*').eq('id', id).single();

        if (error) {
            throw new HttpException('Error al obtener el proveedor: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        if (!data) {
            return null;
        }

        const supplier = new Supplier(
            data.name,
            data.tax_id,
            data.contact,
            data.address,
            data.id
        );

        return supplier;
    }
}