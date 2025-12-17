import { IsEmail, IsString, IsOptional } from 'class-validator';

export default class UpdateUserCommandDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
