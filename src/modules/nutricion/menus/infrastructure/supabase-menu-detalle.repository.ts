import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { MenuDetalle } from '../domain/model/menu-detalle.model';
import { MenuDetalleRepository } from '../domain/contract/menu-detalle.repository';

@Injectable()
export class SupabaseMenuDetalleRepository implements MenuDetalleRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabase: SupabaseClient,
    ) { }

    async create(data: Partial<MenuDetalle>): Promise<MenuDetalle> {
        const { data: created, error } = await this.supabase
            .from('menu_detalle')
            .insert([{ menu_id: data.menu_id, alimento_id: data.alimento_id, cantidad: data.cantidad, unidad: data.unidad, variante: data.variante, observacion: data.observacion }])
            .select()
            .single();

        if (error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        return created as MenuDetalle;
    }

    async findByMenuId(menuId: string): Promise<MenuDetalle[]> {
        const { data, error } = await this.supabase.from('menu_detalle').select('*').eq('menu_id', menuId);
        if (error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        return (data || []) as MenuDetalle[];
    }

    async delete(id: string): Promise<void> {
        const { error } = await this.supabase.from('menu_detalle').delete().eq('id', id);
        if (error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
