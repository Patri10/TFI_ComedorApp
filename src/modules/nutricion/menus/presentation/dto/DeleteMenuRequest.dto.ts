import { IsString } from 'class-validator';

export default class DeleteMenuRequestDto {
    @IsString()
    public readonly id: string;
}
