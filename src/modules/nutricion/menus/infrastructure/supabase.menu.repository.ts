import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import Menu from '../domain/model/menu';
import RecipeItem from '../domain/model/recipe_item';
import { MenuRepository, ServicioResult, ServicioHistorial } from '../domain/contract/menu.repository';

@Injectable()
export class SupabaseMenuRepository implements MenuRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabase: SupabaseClient,
    ) { }

    async createMenu(menu: Menu): Promise<Menu> {
        const { data, error } = await this.supabase
            .from('menus')
            .insert({
                fecha: menu.getFecha(),
                descripcion: menu.getDescripcion(),
                calorias_totales: menu.getCaloriasTotales(),
            })
            .select('id')
            .single();

        if (error) {
            throw new HttpException(
                'Error al crear el menú: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        return new Menu(
            menu.getFecha(),
            menu.getDescripcion(),
            menu.getCaloriasTotales(),
            [],
            data.id,
        );
    }

    async findAllMenus(): Promise<Menu[]> {
        const { data, error } = await this.supabase
            .from('menus')
            .select(`
                *,
                recipes (
                    id,
                    food_id,
                    quantity_per_portion,
                    foods ( id, name, unit )
                )
            `)
            .order('fecha', { ascending: false });

        if (error) {
            throw new HttpException(
                'Error al buscar menús: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return data.map((m: any) => this.mapToDomain(m));
    }

    async findMenuById(id: string): Promise<Menu | null> {
        const { data, error } = await this.supabase
            .from('menus')
            .select(`
                *,
                recipes (
                    id,
                    food_id,
                    quantity_per_portion,
                    foods ( id, name, unit )
                )
            `)
            .eq('id', id)
            .maybeSingle();

        if (error) {
            throw new HttpException(
                'Error al buscar el menú: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        if (!data) return null;
        return this.mapToDomain(data);
    }

    async updateMenu(id: string, menu: Menu): Promise<Menu> {
        const { error } = await this.supabase
            .from('menus')
            .update({
                fecha: menu.getFecha(),
                descripcion: menu.getDescripcion(),
                calorias_totales: menu.getCaloriasTotales(),
            })
            .eq('id', id);

        if (error) {
            throw new HttpException(
                'Error al actualizar el menú: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        const updated = await this.findMenuById(id);
        if (!updated) {
            throw new HttpException('No se pudo recuperar el menú actualizado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return updated;
    }

    async deleteMenu(id: string): Promise<void> {
        // recipes se eliminan en cascada por la FK ON DELETE CASCADE
        const { error } = await this.supabase
            .from('menus')
            .delete()
            .eq('id', id);

        if (error) {
            throw new HttpException(
                'Error al eliminar el menú: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async servirMenu(id: string, cantidadAlumnos: number): Promise<ServicioResult> {
        // 1. Obtener todas las recetas del menú con datos del alimento
        const { data: recipes, error: recipesError } = await this.supabase
            .from('recipes')
            .select(`
                id,
                food_id,
                quantity_per_portion,
                foods ( id, name, unit, stock )
            `)
            .eq('menu_id', id);

        if (recipesError) {
            throw new HttpException(
                'Error al obtener ingredientes del menú: ' + recipesError.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        if (!recipes || recipes.length === 0) {
            throw new HttpException(
                'Este menú no tiene ingredientes en su receta',
                HttpStatus.BAD_REQUEST,
            );
        }

        // 2. Verificar stock suficiente para todos los ingredientes.
        // Las porciones se almacenan en GRAMOS — convertimos a la unidad del inventario antes de comparar.
        const insuficientes: string[] = [];
        for (const r of recipes) {
            const food = r.foods as any;
            const totalGramos = r.quantity_per_portion * cantidadAlumnos;
            const totalEnUnidad = this.convertirGramosAUnidad(totalGramos, food.unit);
            if (food.stock < totalEnUnidad) {
                insuficientes.push(
                    `${food.name}: necesario ${totalEnUnidad}${food.unit}, disponible ${food.stock}${food.unit}`
                );
            }
        }

        if (insuficientes.length > 0) {
            throw new HttpException(
                {
                    message: 'Stock insuficiente para servir el menú',
                    detalle: insuficientes,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        // 3. Descontar stock de cada ingrediente (con conversión de unidades)
        const ingredientesDescontados: ServicioResult['ingredientes_descontados'] = [];
        for (const r of recipes) {
            const food = r.foods as any;
            const totalGramos = r.quantity_per_portion * cantidadAlumnos;
            const totalDescontado = this.convertirGramosAUnidad(totalGramos, food.unit);
            // Redondeo a 3 decimales para evitar errores de punto flotante
            const nuevoStock = Math.round((food.stock - totalDescontado) * 1000) / 1000;

            const { error: stockError } = await this.supabase
                .from('foods')
                .update({ stock: nuevoStock })
                .eq('id', r.food_id);

            if (stockError) {
                throw new HttpException(
                    `Error al actualizar stock de ${food.name}: ` + stockError.message,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            ingredientesDescontados.push({
                food_id: r.food_id,
                food_name: food.name,
                quantity_per_portion: r.quantity_per_portion,
                total_descontado: totalDescontado,
                unit: food.unit,
            });
        }

        // 4. Registrar el servicio en historial
        const hoy = new Date().toISOString().substring(0, 10);
        await this.supabase
            .from('servicios_menu')
            .insert({ menu_id: id, fecha_servicio: hoy, cantidad_alumnos: cantidadAlumnos });

        return {
            menu_id: id,
            fecha_servicio: hoy,
            cantidad_alumnos: cantidadAlumnos,
            ingredientes_descontados: ingredientesDescontados,
        };
    }

    /**
     * Convierte gramos (unidad de las porciones) a la unidad del inventario.
     *   kg / L / litros → divide por 1000
     *   g / gr / ml / unidades / otros → sin conversión
     */
    private convertirGramosAUnidad(gramos: number, unit: string): number {
        const u = unit.toLowerCase().trim();
        if (u === 'kg') return gramos / 1000;
        if (u === 'l' || u === 'lt' || u === 'lts' || u === 'litro' || u === 'litros') return gramos / 1000;
        return gramos;
    }

    async getHistorial(): Promise<ServicioHistorial[]> {
        const { data, error } = await this.supabase
            .from('servicios_menu')
            .select(`
                id,
                menu_id,
                fecha_servicio,
                cantidad_alumnos,
                created_at,
                menus ( descripcion )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            throw new HttpException(
                'Error al obtener historial: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return (data ?? []).map((h: any) => ({
            id: h.id,
            menu_id: h.menu_id,
            menu_descripcion: h.menus?.descripcion ?? 'Menú eliminado',
            fecha_servicio: h.fecha_servicio,
            cantidad_alumnos: h.cantidad_alumnos,
            created_at: h.created_at,
        }));
    }

    private mapToDomain(data: any): Menu {
        const recipes: RecipeItem[] = (data.recipes ?? []).map(
            (r: any) => new RecipeItem(
                data.id,
                r.food_id,
                r.quantity_per_portion,
                r.id,
                r.foods?.name,
                r.foods?.unit,
            ),
        );

        return new Menu(
            new Date(data.fecha),
            data.descripcion,
            data.calorias_totales ?? 0,
            recipes,
            data.id,
        );
    }
}
