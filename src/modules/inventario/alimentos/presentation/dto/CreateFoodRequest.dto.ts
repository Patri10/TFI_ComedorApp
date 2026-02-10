import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { FoodCategory } from '../../domain/model/food-category.enum';
import { FoodUnit } from '../../domain/model/food-unit.enum';

export class CreateFoodRequestDto {
    @IsString()
    public readonly name: string;

    @IsString()
    @IsOptional()
    public readonly category: FoodCategory;

    @IsString()
    @IsOptional()
    public readonly unit: FoodUnit;

    @IsNumber()
    public readonly stock: number;

    @IsOptional()
    @IsDateString()
    public readonly expiration_date: string;
}
