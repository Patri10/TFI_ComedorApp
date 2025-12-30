export default class CreateUserCommandDto {
<<<<<<< HEAD
    public getNombre(): string {
        return this.name;
    }

=======
    public getName(): string {
        return this.name;
    }

    public getLastName(): string {
        return this.lastName;
    }

>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

<<<<<<< HEAD
    public getRol(): string {
        return this.rol;
    }

    private readonly name: string;
    private readonly email: string;
    private readonly password: string;
    private readonly rol: string;

    public constructor(
        email: string,
        password: string,
        name: string,
        rol: string
=======
    public getRole(): string {
        return this.role;
    }

    private readonly name: string;
    private readonly lastName: string;
    private readonly email: string;
    private readonly password: string;
    private readonly role: string;

    public constructor(
        email:string,
        password: string,
        name: string,
        lastName: string,
        role: string
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
<<<<<<< HEAD
        this.rol = rol;
    }
=======
        this.lastName = lastName;
        this.role = role;
    }
    
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
}