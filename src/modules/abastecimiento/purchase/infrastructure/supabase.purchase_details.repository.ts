import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import type { PurchaseDetailsRepository } from '../domain/contract/purchase_details.repository';
import PurchaseDetail from '../domain/model/purchase_details';

@Injectable()
export class SupbasePurchaseDetailsRepository
  implements PurchaseDetailsRepository
{
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabaseClient: SupabaseClient,
  ) {}

  async createPurchaseDetail(
    purchaseDetail: PurchaseDetail,
  ): Promise<PurchaseDetail> {
    const { data, error } = await this.supabaseClient
      .from('purchase_details')
      .insert({
        purchase_id: purchaseDetail.getPurchaseId(),
        food_id: purchaseDetail.getFoodId(),
        quantity: purchaseDetail.getQuantity(),
        unit_price: purchaseDetail.getUnitPrice(),
      })
      .select('*')
      .single();

    if (error) {
      throw new HttpException(
        'Error al crear el detalle de compra: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return new PurchaseDetail(
      data.purchase_id,
      data.food_id,
      data.quantity,
      data.unit_price,
      data.id,
    );
  }

  async findPurchaseDetailById(id: string): Promise<PurchaseDetail | null> {
    const { data, error } = await this.supabaseClient
      .from('purchase_details')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new PurchaseDetail(
      data.purchase_id,
      data.food_id,
      data.quantity,
      data.unit_price,
      data.id,
    );
  }

  async findAllPurchaseDetails(): Promise<PurchaseDetail[]> {
    const { data, error } = await this.supabaseClient
      .from('purchase_details')
      .select('*');

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return data.map(
      (detail: any) =>
        new PurchaseDetail(
          detail.purchase_id,
          detail.food_id,
          detail.quantity,
          detail.unit_price,
          detail.id,
        ),
    );
  }

  async updatePurchaseDetail(
    purchaseDetail: PurchaseDetail,
  ): Promise<PurchaseDetail> {
    const { data, error } = await this.supabaseClient
      .from('purchase_details')
      .update({
        purchase_id: purchaseDetail.getPurchaseId(),
        food_id: purchaseDetail.getFoodId(),
        quantity: purchaseDetail.getQuantity(),
        unit_price: purchaseDetail.getUnitPrice(),
      })
      .eq('id', purchaseDetail.getId())
      .select('*')
      .single();

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new PurchaseDetail(
      data.purchase_id,
      data.food_id,
      data.quantity,
      data.unit_price,
      data.id,
    );
  }

  async deletePurchaseDetail(id: string): Promise<void> {
    const { error } = await this.supabaseClient
      .from('purchase_details')
      .delete()
      .eq('id', id);

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
