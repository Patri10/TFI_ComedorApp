import { IsString, IsOptional } from "class-validator";

export default class UpdateSupplierRequest {
    @IsString()
    @IsOptional()
    public readonly name?: string;

    @IsString()
    @IsOptional()
    public readonly tax_id?: string;

    @IsString()
    @IsOptional()
    public readonly contact?: string;

    @IsString()
    @IsOptional()
    public readonly address?: string;

    public constructor(
        name?: string,
        tax_id?: string,
        contact?: string,
        address?: string
    ) {
        this.name = name;
        this.tax_id = tax_id;
        this.contact = contact;
        this.address = address;
    }
}