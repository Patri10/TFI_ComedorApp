import User from "../model/user";
import CreateUserRequestDto from "../../presentation/dto/CreateUserRequest.dto";
export interface UserRepository {
    createUser(user: User): Promise<User>;
    getAllUsers(): Promise<User[]>;
    findById(id: string, user: User): Promise<User | null>;
    updateUser(id: string, user: User): Promise<void>;
    deleteUser(id: string, user: User): Promise<void>;
}
