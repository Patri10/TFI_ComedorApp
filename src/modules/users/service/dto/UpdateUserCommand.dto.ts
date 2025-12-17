export default class UpdateUserCommandDto {
  private readonly name: string;
  private readonly role: string;
  private readonly password: string;
  private readonly email: string;

  public constructor(
    name: string,
    role: string,
    password: string,
    email: string,
  ) {
    this.name = name;
    this.role = role;
    this.password = password;
    this.email = email;
  }

  public getName(): string {
    return this.name;
  }

  public getRole(): string {
    return this.role;
  }

  public getPassword(): string {
    return this.password;
  }

  public getEmail(): string {
    return this.email;
  }
}
