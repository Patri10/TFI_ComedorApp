import { IsString, IsNotEmpty, IsEmail } from "class-validator";
<<<<<<< HEAD
import { Type } from "class-transformer";
=======
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9

export default class CreateUserRequestDto {
    @IsString()
    @IsNotEmpty()
<<<<<<< HEAD
    @Type(() => String)
=======
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
<<<<<<< HEAD
    @IsEmail()
    @Type(() => String)
=======
    public readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    public readonly password: string;

    @IsString()
    @IsNotEmpty()
<<<<<<< HEAD
    @Type(() => String)
    public readonly rol: string;

    
=======
    public readonly role: string;
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
}
