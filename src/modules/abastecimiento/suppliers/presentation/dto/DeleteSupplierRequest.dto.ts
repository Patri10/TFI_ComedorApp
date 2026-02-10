import { IsString } from "class-validator";

export default class DeleteSupplierRequestDto {
    @IsString()
    public readonly id: string;
}