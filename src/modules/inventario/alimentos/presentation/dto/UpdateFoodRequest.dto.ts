import { IsOptional, IsString, IsNumber, IsDateString } from "class-validator";
import { FoodCategory } from "../../domain/model/food-category.enum";
import { FoodUnit } from "../../domain/model/food-unit.enum";

export class UpdateFoodRequestDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    category: FoodCategory;

    @IsOptional()
    @IsString()
    unit: FoodUnit;

    @IsOptional()
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsDateString()
    expiration_date: string;
}
