import { IsNotEmpty, IsString, IsDate, IsNumber, IsOptional, IsArray, ValidateNested, } from "class-validator";
import { Type } from 'class-transformer';


export class UpdatePurchaseDetailRequestDto {
    @IsOptional()
    @IsString()
    food_id?: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    unit_price?: number;
}
export default class UpdatePurchaseRequestDto {
    @IsOptional()
    @IsString()
    supplier_id: string;

    @IsOptional()
    @IsString()
    fund_id: string;

    @IsOptional()
    @IsDate()
    date: Date;

    @IsOptional()
    @IsNumber()
    total_amount: number;

    @IsOptional()
    @IsString()
    invoice_number: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdatePurchaseDetailRequestDto)
    purchase_details?: UpdatePurchaseDetailRequestDto[];
}