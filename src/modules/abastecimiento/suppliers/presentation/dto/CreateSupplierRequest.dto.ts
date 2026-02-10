import { IsString } from "class-validator";

export default class CreateSupplierRequestDto {
    @IsString()
    public readonly name!: string;

    @IsString()
    public readonly tax_id!: string;

    @IsString()
    public readonly contact!: string;

    @IsString()
    public readonly address!: string;
}
