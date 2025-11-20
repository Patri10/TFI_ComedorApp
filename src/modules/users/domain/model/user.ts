export default class {
    public constructor(
        private readonly name: string,
        private readonly lastName: string,
        private readonly email: string,
        private readonly password: string,
        private readonly role: string,
    ) { }

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
}