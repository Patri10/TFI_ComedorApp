import User from "../model/user";
<<<<<<< HEAD
import DeleteUserCommandDto from "../../service/dto/DeleteUserCommand.dto";
export interface UserRepository {
    createUser(user: User): Promise<User>;
    getAllUsers(): Promise<User[]>;
    findById(id: string, user: User): Promise<User | null>;
    updateUser(id: string, user: User): Promise<void>;
    deleteUser(id: string, user: DeleteUserCommandDto): Promise<void>;
}
 
=======

export interface UserRepository {
    getAllUsers(): Promise<User[]>; 
}
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
