import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import CreateUserRequestDto from '../presentation/dto/CreateUserRequest.dto';
import CreateUserCommandDto from '../service/dto/CreateUserCommand.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    const command = new CreateUserCommandDto(
      createUserRequestDto.email,
      createUserRequestDto.password,
      createUserRequestDto.nombre,
      createUserRequestDto.rol
    );
    return this.usersService.createUser(command);
  }


}
