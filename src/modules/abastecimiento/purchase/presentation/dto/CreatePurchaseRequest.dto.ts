import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsOptional } from "class-validator";

export class CreatePurchaseDetailRequestDto {
    @IsNotEmpty()
    @IsString()
    food_name: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    unit_price: number;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    unit?: string;

    @IsOptional()
    @IsString()
    expiration_date?: string;
}

export class CreatePurchaseRequestDto {
    @IsNotEmpty()
    @IsString()
    supplier_id: string;

    @IsNotEmpty()
    @IsString()
    fund_id: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePurchaseDetailRequestDto)
    purchase_details: CreatePurchaseDetailRequestDto[];
}
