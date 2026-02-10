import Food from "../model/food";

export interface FoodRepository {
    createFood(food: Food): Promise<any>;
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    updateFood(id: string, food: Food): Promise<any>;
    deleteFood(id: string): Promise<void>;
    stockAlert(): Promise<any[]>;
    validateDate(date: Date): Promise<string>;
    findCategory(category: string): Promise<any[]>;
    getCategory(): Promise<any[]>;
}