import { IsNotEmpty, IsString, IsOptional, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateMenuRequestDto {
    @IsNotEmpty()
    @IsDateString()
    fecha: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    calorias_totales?: number;
}
