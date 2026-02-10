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
            .maybeSingle();

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
        // Intentamos traer los detalles también
        const { data, error } = await this.supabaseClient
            .from('purchases')
            .select('*, purchase_details(*)');

        if (error) {
            throw new HttpException("Error al buscar compras: " + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return data.map((p: any) => this.mapToDomain(p));
    }

    async findByInvoiceNumber(invoice_number: string): Promise<Purchase | null> {
        const { data, error } = await this.supabaseClient
            .from('purchases')
            .select('*, purchase_details(*)')
            .eq('invoice_number', invoice_number)
            .maybeSingle();

        if (error) {
            throw new HttpException("Error al buscar compra por factura: " + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!data) {
            return null;
        }

        return this.mapToDomain(data);
    }

    async findById(id: string): Promise<Purchase | null> {
        const { data, error } = await this.supabaseClient
            .from('purchases')
            .select('*, purchase_details(*)')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            throw new HttpException("Error al buscar compra por ID: " + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!data) {
            return null;
        }
        return this.mapToDomain(data);
    }

    async updatePurchase(id: string, purchase: Purchase): Promise<Purchase> {
        const { data, error } = await this.supabaseClient.from('purchases').update({
            supplier_id: purchase.getSupplierId(),
            fund_id: purchase.getFundId(),
            date: purchase.getDate(),
            total_amount: purchase.getTotalAmount(),
            invoice_number: purchase.getInvoiceNumber(),
        }).eq('id', id).select('*').single();
        if (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Para update, usamos los detalles que ya tenía el objeto purchase o vacíos si no se actualizaron
        return new Purchase(
            data.supplier_id,
            data.fund_id,
            data.date,
            data.total_amount,
            data.invoice_number,
            purchase.getPurchaseDetails(), // Mantener los detalles del objeto original
            data.id
        );
    }

    async deletePurchase(id: string): Promise<void> {
        const { error } = await this.supabaseClient.from('purchases').delete().eq('id', id);
        if (error) {
            throw new HttpException("Error al eliminar la compra: " + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private mapToDomain(data: any): Purchase {
        const details = data.purchase_details ? data.purchase_details.map((d: any) => new Purchase_details(
            d.purchase_id,
            d.food_id,
            d.quantity,
            d.unit_price,
            d.id
        )) : [];

        return new Purchase(
            data.supplier_id,
            data.fund_id,
            data.date,
            data.total_amount,
            data.invoice_number,
            details,
            data.id
        );
    }

}
