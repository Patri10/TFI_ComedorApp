import { IsString } from "class-validator";

export class DeleteFoodRequestDto {
    @IsString()
    id: string;
}