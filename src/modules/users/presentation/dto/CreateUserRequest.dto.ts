import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export default class CreateUserRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    public readonly password: string;

    @IsString()
    @IsNotEmpty()
    public readonly rol: string;

    
}
