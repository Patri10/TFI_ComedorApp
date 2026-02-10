import { FoodCategory } from "../../domain/model/food-category.enum";
import { FoodUnit } from "../../domain/model/food-unit.enum";

export class UpdateFoodCommandDto {
    private readonly name: string;
    private readonly category: FoodCategory;
    private readonly unit: FoodUnit;
    private readonly stock: number;
    private readonly expiration_date: Date;

    public constructor(
        name: string,
        category: FoodCategory,
        unit: FoodUnit,
        stock: number,
        expiration_date: Date
    ) {
        this.name = name;
        this.category = category;
        this.unit = unit;
        this.stock = stock;
        this.expiration_date = expiration_date;
    }



    public getName(): string {
        return this.name;
    }

    public getCategory(): FoodCategory {
        return this.category;
    }

    public getUnit(): FoodUnit {
        return this.unit;
    }

    public getStock(): number {
        return this.stock;
    }

    public getExpirationDate(): Date {
        return this.expiration_date;
    }
}