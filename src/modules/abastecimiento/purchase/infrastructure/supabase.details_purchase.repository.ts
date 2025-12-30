import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { HttpStatus, HttpException, Inject } from '@nestjs/common';
import PurchaseDetail from "../domain/model/purchase_details";
import { PurchaseDetailsRepository } from "../domain/contract/purchase_details.repository";

@Injectable()
export class SupabaseDetailsPurchaseRepository implements PurchaseDetailsRepository{
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabaseClient: SupabaseClient,
    ) {}

    async findAllPurchaseDetails(): Promise<PurchaseDetail[]> {
        const { data, error } = await this.supabaseClient
            .from('purchase_details')
            .select('*');

        if (error) {
            throw new HttpException('Error al obtener los detalles de compra: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        return data.map(item => new PurchaseDetail(
            item.id,
            item.purchase_id,
            item.food_id,
            item.quantity,
            item.unit_price
        ));
    }

    async findPurchaseDetailsByName(name: string): Promise<PurchaseDetail[]> {
        const { data, error } = await this.supabaseClient
            .from('purchase_details')
            .select('*')
            .ilike('food_name', `%${name}%`);

        if (error) {
            throw new HttpException('Error al obtener los detalles de compra por nombre: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        return data.map(item => new PurchaseDetail(
            item.id,
            item.purchase_id,
            item.food_id,
            item.quantity,
            item.unit_price
        ));
    }
}