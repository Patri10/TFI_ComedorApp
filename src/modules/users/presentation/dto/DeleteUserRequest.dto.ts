import { IsString } from 'class-validator';

export default class DeleteUserRequestDto {
  @IsString()
  public readonly id: string;
}
