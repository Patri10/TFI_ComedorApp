import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export default class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  public readonly rol: string;
}
