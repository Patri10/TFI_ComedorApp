import { FoodCategory } from "./food-category.enum";
import { FoodUnit } from "./food-unit.enum";

export default class Food {
    private id?: string;
    private name: string;
    private category: FoodCategory;
    private unit: FoodUnit;
    private stock: number;
    private expiration_date?: Date;

    constructor(
        name: string,
        category: FoodCategory,
        unit: FoodUnit,
        stock: number,
        expiration_date?: Date,
        id?: string
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.unit = unit;
        this.stock = stock;
        this.expiration_date = expiration_date;
    }

    public getId(): string | undefined {
        return this.id;
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
        if (this.stock < 0) {
            throw new Error("Stock no puede ser negativo");
        }
        return this.stock;
    }

    public getExpirationDate(): Date | undefined {
        if (this.expiration_date && this.expiration_date < new Date()) {
            throw new Error("Fecha de expiración no puede ser menor a la fecha actual");
        }
        return this.expiration_date;
    }
}