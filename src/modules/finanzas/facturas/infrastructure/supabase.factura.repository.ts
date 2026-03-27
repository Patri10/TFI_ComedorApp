import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { FacturaRepository } from '../domain/contract/factura.repository';
import Factura from '../domain/model/factura.model';

@Injectable()
export class SupabaseFacturaRepository implements FacturaRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabaseClient: SupabaseClient,
        @Inject('SUPABASE_ADMIN_CLIENT')
        private readonly supabaseAdmin: SupabaseClient,
    ) { }

    async createFactura(factura: Factura): Promise<Factura> {
        const insertData: any = {
            purchase_id: factura.getPurchaseId(),
            invoice_number: factura.getInvoiceNumber(),
            date: factura.getDate(),
        };

        if (factura.getFileUrl()) {
            insertData.file_url = factura.getFileUrl();
        }

        const { data, error } = await this.supabaseClient
            .from('invoices')
            .insert(insertData)
            .select()
            .single();

        if (error) {
            throw new HttpException(
                'Error al crear la factura: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        // Actualizar el status de la compra a 'pagada'
        const { error: purchaseError } = await this.supabaseClient
            .from('purchases')
            .update({ status: 'pagada' })
            .eq('id', factura.getPurchaseId());

        if (purchaseError) {
            throw new HttpException(
                'Factura creada pero no se pudo actualizar el estado de la compra: ' + purchaseError.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return this.mapToDomain(data);
    }

    async findAllFacturas(): Promise<Factura[]> {
        const { data, error } = await this.supabaseClient
            .from('invoices')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            throw new HttpException(
                'Error al obtener las facturas: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return data.map((f: any) => this.mapToDomain(f));
    }

    async findFacturaById(id: string): Promise<Factura | null> {
        const { data, error } = await this.supabaseClient
            .from('invoices')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            throw new HttpException(
                'Error al obtener la factura: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return data ? this.mapToDomain(data) : null;
    }

    async findFacturaByPurchaseId(purchaseId: string): Promise<Factura | null> {
        const { data, error } = await this.supabaseClient
            .from('invoices')
            .select('*')
            .eq('purchase_id', purchaseId)
            .maybeSingle();

        if (error) {
            throw new HttpException(
                'Error al buscar factura por compra: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return data ? this.mapToDomain(data) : null;
    }

    async uploadPdfToStorage(purchaseId: string, buffer: Buffer, mimetype: string): Promise<string> {
        const fileName = `facturas/${purchaseId}_${Date.now()}.pdf`;
        const { error: uploadError } = await this.supabaseAdmin.storage
            .from('facturas')
            .upload(fileName, buffer, { contentType: mimetype, upsert: true });

        if (uploadError) {
            throw new HttpException(
                'Error al subir el PDF: ' + uploadError.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const { data } = this.supabaseAdmin.storage
            .from('facturas')
            .getPublicUrl(fileName);

        return data.publicUrl;
    }

    async deleteFactura(id: string): Promise<void> {
        const { error } = await this.supabaseClient
            .from('invoices')
            .delete()
            .eq('id', id);

        if (error) {
            throw new HttpException(
                'Error al eliminar la factura: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    private mapToDomain(data: any): Factura {
        return new Factura(
            data.purchase_id,
            data.invoice_number,
            new Date(data.date),
            data.file_url ?? null,
            data.id,
        );
    }
}
