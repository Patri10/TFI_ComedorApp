import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { HttpStatus, HttpException, Inject } from '@nestjs/common';
import Purchase from "../domain/model/purchase";
import { PurchaseRepository } from "../domain/contract/purchase.respository";
import Purchase_details from "../domain/model/purchase_details";
import UpdatePurchaseCommandDto from "../service/dto/UpdatePurchaseCommand.dto";


@Injectable()
export class SupabaseComprasRepository implements PurchaseRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabaseClient: SupabaseClient,

    ) { }

    async createPurchase(purchase: Purchase): Promise<Purchase> {
        
        const { data: purchaseData, error: purchaseError } = await this.supabaseClient
            .from('purchases')
            .insert({
                supplier_id: purchase.getSupplierId(),
                fund_id: purchase.getFundId(),
                date: purchase.getDate(),
                total_amount: purchase.getTotalAmount(),
                invoice_number: purchase.getInvoiceNumber(),
            })
            .select('id')
            .single();

        if (purchaseError) {
            throw new HttpException('Compra no creada: ' + purchaseError.message, HttpStatus.BAD_REQUEST);
        }

        const newPurchaseId = purchaseData.id;

        const { data: exists, error: existError } = await this.supabaseClient
        .from('purchases')
        .select('id')
        .eq('id', newPurchaseId)
        .single();

    if (existError || !exists) {
        throw new HttpException('Error de integridad: La compra cabecera no se encuentra para asociar detalles.', HttpStatus.INTERNAL_SERVER_ERROR);
    }


        if (purchase.getPurchaseDetails() && purchase.getPurchaseDetails().length > 0) {
            const detailsData = purchase.getPurchaseDetails().map(detail => ({
                purchase_id: newPurchaseId,
                food_id: detail.getFoodId(),
                quantity: detail.getQuantity(),
                unit_price: detail.getUnitPrice()
            }));

            const { error: detailsError } = await this.supabaseClient
                .from('purchase_details')
                .insert(detailsData);

            if (detailsError) {
                console.error("Error al insertar detalles:", detailsError);
                throw new HttpException('Error al crear los detalles de la compra: ' + detailsError.message, HttpStatus.BAD_REQUEST);
            }
        }

        return purchase;
    }

    async findAllPurchases(): Promise<Purchase[]> {
        const { data, error } = await this.supabaseClient.from('purchases').select('*');
        if (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return data.map((p: any) => new Purchase(
            p.id,
            p.supplier_id,
            p.fund_id,
            p.date,
            p.total_amount,
            p.invoice_number,
            p.purchase_details
        ));
    }

    async updatePurchase(purchase: UpdatePurchaseCommandDto): Promise<Purchase> {
        const { data, error } = await this.supabaseClient.from('purchases').update({
            supplier_id: purchase.getSupplierId(),
            fund_id: purchase.getFundId(),
            date: purchase.getDate(),
            total_amount: purchase.getTotalAmount(),
            invoice_number: purchase.getInvoiceNumber(),
        }).eq('id', purchase.getId()).select('*').single();
        if (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new Purchase(
            data.id,
            data.supplier_id,
            data.fund_id,
            data.date,
            data.total_amount,
            data.invoice_number,
            data.purchase_details
        );
    }

    async deletePurchase(id: string): Promise<void> {
        const { error } = await this.supabaseClient.from('purchases').delete().eq('id', id);
        if (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
}
    

