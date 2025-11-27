import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { UserRepository } from '../domain/contract/user.repository';
import CreateUserCommandDto from './dto/CreateUserCommand.dto';
import { UpdateUserCommandDto } from './dto/UpdateUserCommand.dto';
import User, { UserRole } from '../domain/model/user';

@Injectable()
export class UsersService {

  constructor(@Inject('UserRepository') private readonly usersRepository: UserRepository) { }

  createUser(dto: CreateUserCommandDto) {
    const user = new User(
      new Date(),
      dto.getEmail(),
      dto.getPassword(),
      randomUUID(),
      undefined,
      dto.getNombre(),
      dto.getRol() as UserRole,
    );
    return this.usersRepository.createUser(user);
  }

  findAll() {
    return this.usersRepository.getAllUsers();
  }

  async updateUser(id: string, updateDto: UpdateUserCommandDto) {
    const user = new User(
      new Date(),
      updateDto.getEmail(),
      updateDto.getPassword(),
      id,
      undefined,
      updateDto.getName(),
      updateDto.getRole() as UserRole,
    );
    return this.usersRepository.updateUser(id, user);
  }
}
