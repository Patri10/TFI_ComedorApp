import { IsString } from 'class-validator';

export default class DeleteRecetaRequestDto {
    @IsString()
    public readonly id: string;
}
