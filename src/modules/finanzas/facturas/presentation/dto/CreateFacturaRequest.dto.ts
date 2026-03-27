import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateFacturaRequestDto {
    @IsNotEmpty()
    @IsString()
    purchase_id: string;

    @IsNotEmpty()
    @IsString()
    invoice_number: string;

    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsOptional()
    @IsString()
    file_url?: string;
}
