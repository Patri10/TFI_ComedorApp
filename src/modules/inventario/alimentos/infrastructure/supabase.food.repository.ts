import { Injectable, Inject } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import Food from "../domain/model/food";
import { FoodRepository } from "../domain/contract/food.repository";
import { FoodCategory } from "../domain/model/food-category.enum";
import { FoodUnit } from "../domain/model/food-unit.enum";

@Injectable()
export class SupabaseFoodRepository implements FoodRepository {
    constructor(
        @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient
    ) { }

    async createFood(food: Food): Promise<Food> {
        const { data, error } = await this.supabase.from('foods').insert({
            name: food.getName(),
            category: food.getCategory(),
            unit: food.getUnit(),
            stock: food.getStock(),
            expiration_date: food.getExpirationDate()
        }).select().single();
        if (error) {
            throw error;
        }

        return data;
    }

    async findAll(): Promise<Food[]> {
        const { data, error } = await this.supabase.from('foods').select('*');
        if (error) {
            throw error;
        }
        return data;
    }

    async findById(id: string): Promise<Food | null> {
        const { data, error } = await this.supabase.from('foods').select('*').eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    }

    async updateFood(id: string, food: Food): Promise<Food> {
        const { data, error } = await this.supabase.from('foods').update({
            name: food.getName(),
            category: food.getCategory(),
            unit: food.getUnit(),
            stock: food.getStock(),
            expiration_date: food.getExpirationDate()
        }).eq('id', id).select().single();
        if (error) {
            throw error;
        }
        return data;
    }

    async deleteFood(id: string): Promise<void> {
        const { error } = await this.supabase.from('foods').delete().eq('id', id);
        if (error) {
            throw error;
        }
    }

    async stockAlert(): Promise<Food[]> {
        const { data, error } = await this.supabase.from('foods').select('*').lt('stock', 10);
        if (error) {
            throw error;
        }
        return data;
    }

    async validateDate(date: Date): Promise<string> {
        const { data, error } = await this.supabase.from('foods').select('*').lt('expiration_date', date);
        if (error) {
            throw error;
        }
        return 'Fecha de vencimiento valida';
    }

    async findCategory(category: string): Promise<Food[]> {
        const { data, error } = await this.supabase.from('foods').select('*').eq('category', category);
        if (error) {
            throw error;
        }
        return data;
    }

    async getCategory(): Promise<any[]> {
        const { data, error } = await this.supabase.from('foods').select('*').eq('category', 'category').single();
        if (error) {
            throw error;
        }
        return data;
    }
}
