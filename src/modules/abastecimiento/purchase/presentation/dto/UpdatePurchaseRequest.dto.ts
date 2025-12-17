import { IsNotEmpty, IsString, IsDate, IsNumber, IsOptional } from "class-validator";

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
}