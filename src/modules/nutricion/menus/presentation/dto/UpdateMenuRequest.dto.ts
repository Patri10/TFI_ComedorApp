import { IsOptional, IsString, IsDateString, IsNumber, Min } from 'class-validator';

export default class UpdateMenuRequestDto {
    @IsOptional()
    @IsDateString()
    fecha?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    calorias_totales?: number;
}
