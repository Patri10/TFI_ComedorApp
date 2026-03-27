import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateRecetaRequestDto {
    @IsNotEmpty()
    @IsUUID()
    menu_id: string;

    @IsNotEmpty()
    @IsUUID()
    food_id: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
    quantity: number;
}
