import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";

class PurchaseDetailDto {
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

export class CreatePurchaseRequestDto {
    @IsNotEmpty()
    @IsString()
    supplier_id: string;

    @IsNotEmpty()
    @IsString()
    fund_id: string;

    @IsNotEmpty()
    @IsNumber()
    total_amount: number;

    @IsNotEmpty()
    @IsString()
    invoice_number: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => PurchaseDetailDto)
    purchase_details: PurchaseDetailDto[]; 
}