import { IsNotEmpty, IsString} from "class-validator";

export default class DeletePurchaseRequestDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}