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
    this.createdAt =
      typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getNombre(): string | undefined {
    return this.nombre;
  }

  public getRol(): UserRole | undefined {
    return this.rol;
  }

  public getUuid(): string | undefined {
    return this.uuid;
  }
}
