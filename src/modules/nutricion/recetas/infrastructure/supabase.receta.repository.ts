import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import Receta from '../domain/model/receta';
import { RecetaRepository } from '../domain/contract/receta.repository';

@Injectable()
export class SupabaseRecetaRepository implements RecetaRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabase: SupabaseClient,
    ) { }

    async createReceta(receta: Receta): Promise<Receta> {
        const { data, error } = await this.supabase
            .from('recipes')
            .insert({
                menu_id: receta.getMenuId(),
                food_id: receta.getFoodId(),
                quantity_per_portion: receta.getQuantity(),
            })
            .select()
            .single();

        if (error) {
            throw new HttpException(
                'Error al crear la receta: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.mapToDomain(data);
    }

    async findAllRecetas(): Promise<Receta[]> {
        const { data, error } = await this.supabase
            .from('recipes')
            .select('*');

        if (error) {
            throw new HttpException('Error al buscar recetas: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return data.map((r: any) => this.mapToDomain(r));
    }

    async findRecetaById(id: string): Promise<Receta | null> {
        const { data, error } = await this.supabase
            .from('recipes')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            throw new HttpException('Error al buscar la receta: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!data) return null;
        return this.mapToDomain(data);
    }

    async findByMenuId(menu_id: string): Promise<Receta[]> {
        const { data, error } = await this.supabase
            .from('recipes')
            .select('*')
            .eq('menu_id', menu_id);

        if (error) {
            throw new HttpException('Error al buscar recetas del menú: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return data.map((r: any) => this.mapToDomain(r));
    }

    async updateReceta(id: string, receta: Receta): Promise<Receta> {
        const { data, error } = await this.supabase
            .from('recipes')
            .update({ quantity_per_portion: receta.getQuantity() })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new HttpException('Error al actualizar la receta: ' + error.message, HttpStatus.BAD_REQUEST);
        }

        return this.mapToDomain(data);
    }

    async deleteReceta(id: string): Promise<void> {
        const { error } = await this.supabase
            .from('recipes')
            .delete()
            .eq('id', id);

        if (error) {
            throw new HttpException('Error al eliminar la receta: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private mapToDomain(data: any): Receta {
        return new Receta(data.menu_id, data.food_id, data.quantity_per_portion, data.id);
    }
}
