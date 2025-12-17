import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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

  @IsNotEmpty()
  @IsNumber()
  purchase_details: number[];
}
