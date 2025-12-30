<<<<<<< HEAD
export enum UserRole {
    ADMIN = 'admin',
    ECONOMA = 'economa',
    DIRECTORA = 'directora',
}

export default class User {
    private readonly createdAt: Date;

    public constructor(
        createdAt: Date | string,
        private readonly email: string,
        private readonly password: string,
        private readonly id?: string,
        private readonly uuid?: string,
        private readonly nombre?: string,
        private readonly rol?: UserRole,
    ) {
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
    }



    public getId(): string | undefined {
        return this.id;
    }

    public getEmail(): string  {
=======
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
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

<<<<<<< HEAD

    public getNombre(): string | undefined {
        return this.nombre;
    }

    public getRol(): UserRole | undefined {
        return this.rol;
    }

    public getUuid(): string | undefined {
        return this.uuid;
=======
    public getRole(): string {
        return this.role;
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
    }
}