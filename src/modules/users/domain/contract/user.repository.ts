import User from "../model/user";

export interface UserRepository {
    getAllUsers(): Promise<User[]>; 
}
