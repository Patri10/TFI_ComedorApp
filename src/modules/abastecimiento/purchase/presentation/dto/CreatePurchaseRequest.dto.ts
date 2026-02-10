import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested } from "class-validator";

// DTO para cada detalle/item de la compra
export class CreatePurchaseDetailRequestDto {
    @IsNotEmpty()
    @IsString()
    food_id: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    unit_price: number;
}

// DTO principal para crear una compra
export class CreatePurchaseRequestDto {
    @IsNotEmpty()
    @IsString()
    supplier_id: string;

    @IsNotEmpty()
    @IsString()
    fund_id: string;

    @IsNotEmpty()
    @IsString()
    invoice_number: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePurchaseDetailRequestDto)
    purchase_details: CreatePurchaseDetailRequestDto[];
}

