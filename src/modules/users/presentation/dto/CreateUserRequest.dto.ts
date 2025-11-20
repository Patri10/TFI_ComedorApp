import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export default class CreateUserRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    public readonly password: string;

    @IsString()
    @IsNotEmpty()
    public readonly role: string;
}
