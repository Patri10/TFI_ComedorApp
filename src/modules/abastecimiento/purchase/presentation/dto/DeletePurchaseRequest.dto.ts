import { IsString } from "class-validator";

export default class DeletePurchaseRequestDto{
    @IsString()
    public readonly id: string;
}