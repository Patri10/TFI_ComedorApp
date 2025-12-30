import { SupplierRepository } from "../domain/contract/supplier.respository";
import { Inject, Injectable } from "@nestjs/common";
import Supplier from "../domain/model/supplier.model";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseSupplierRepository implements SupplierRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabaseClient: SupabaseClient,
    ) { }

    async createSupplier(supplier: Supplier): Promise<Supplier> {
        const { data, error } = await this.supabaseClient
            .from('suppliers')
            .insert({
                name: supplier.getName(),
                tax_id: supplier.getTaxId(),
                contact: supplier.getContact(),
                address: supplier.getAddress(),
            })
            .select('*')
            .single();

        if (error) {
            throw new Error('Error creating supplier: ' + error.message);
        }

        return new Supplier(
            data.name,
            data.tax_id,
            data.contact,
            data.address,
            data.id
        );
    }

    async findSupplierById(id: string): Promise<Supplier | null> {
        const { data, error } = await this.supabaseClient
            .from('suppliers')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') { // No rows found
                return null;
            }
            throw new Error('Error finding supplier: ' + error.message);
        }

        return new Supplier(
            data.name,
            data.tax_id,
            data.contact,
            data.address,
            data.id
        );
    }

    async findAllSuppliers(): Promise<Supplier[]> {
        const { data, error } = await this.supabaseClient
            .from('suppliers')
            .select('*');

        if (error) {
            throw new Error('Error fetching suppliers: ' + error.message);
        }

        return data.map((item: any) => new Supplier(
            item.name,
            item.tax_id,
            item.contact,
            item.address,
            item.id
        ));
    }

    async updateSupplier(supplier: Supplier): Promise<Supplier> {
        const { data, error } = await this.supabaseClient
            .from('suppliers')
            .update({
                name: supplier.getName(),
                tax_id: supplier.getTaxId(),
                contact: supplier.getContact(),
                address: supplier.getAddress(),
            })
            .eq('id', supplier.getId())
            .select('*')
            .single();

        if (error) {
            throw new Error('Error updating supplier: ' + error.message);
        }

        return new Supplier(
            data.name,
            data.tax_id,
            data.contact,
            data.address,
            data.id
        );
    }

    async deleteSupplier(id: string): Promise<void> {
        const { error } = await this.supabaseClient
            .from('suppliers')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error('Error deleting supplier: ' + error.message);
        }
    }
}