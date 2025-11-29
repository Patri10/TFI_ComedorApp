export default class CreateUserCommandDto {
    public getNombre(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

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
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.rol = rol;
    }
}