import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSupplierRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    contact?: string;

    @IsNotEmpty()
    tax_id: string;

    @IsOptional()
    @IsString()
    address?: string;
}