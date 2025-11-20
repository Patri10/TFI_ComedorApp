import { Inject, Injectable } from '@nestjs/common';
import CreateUserDto from '../users/presentation/dto/CreateUserRequest.dto';
import type { UserRepository } from '../users/domain/contract/user.repository';


@Injectable()
export class UsersService {

  constructor(@Inject('UserRepository') private readonly usersRepository: UserRepository,
  ) { }
  findAll() {
    return this.usersRepository.getAllUsers();
  }

}
