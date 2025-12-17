import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import CreateUserRequestDto from '../presentation/dto/CreateUserRequest.dto';
import CreateUserCommandDto from '../service/dto/CreateUserCommand.dto';
import UpdateUserRequestDto from '../presentation/dto/UpdateUserRequest.dto';
import UpdateUserCommandDto from '../service/dto/UpdateUserCommand.dto';
import DeleteUserRequestDto from './dto/DeleteUserRequest.dto';
import DeleteUserCommandDto from '../service/dto/DeleteUserCommand.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '../domain/model/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    const command = new CreateUserCommandDto(
      createUserRequestDto.email,
      createUserRequestDto.password,
      createUserRequestDto.name,
      createUserRequestDto.rol,
    );
    return this.usersService.createUser(command);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateUser(
    @Param('id') id: string,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    const command = new UpdateUserCommandDto(
      updateUserRequestDto.email,
      updateUserRequestDto.password,
      updateUserRequestDto.name,
      updateUserRequestDto.role,
    );
    return this.usersService.updateUser(id, command);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteUser(
    @Param('id') id: string,
    deletUserRequestDto: DeleteUserRequestDto,
  ) {
    const command = new DeleteUserCommandDto(id);
    return this.usersService.deleteUser(id, command);
  }
}
