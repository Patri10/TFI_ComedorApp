export default class CreateUserCommandDto {
    public getName(): string {
        return this.name;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

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
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.role = role;
    }
    
}