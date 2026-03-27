import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { IsInt, Min } from 'class-validator';
import { MenusService } from '../service/menus.service';
import { Roles } from '../../../auth/roles.decorator';
import { UserRole } from '../../../users/domain/model/user';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { CreateMenuRequestDto } from './dto/CreateMenuRequest.dto';
import { CreateMenuCommandDto } from '../service/dto/CreateMenuCommand.dto';
import UpdateMenuRequestDto from './dto/UpdateMenuRequest.dto';
import UpdateMenuCommandDto from '../service/dto/UpdateMenuCommand.dto';
import DeleteMenuCommandDto from '../service/dto/DeleteMenuCommand.dto';

class ServirMenuDto {
    @IsInt()
    @Min(1)
    cantidad_alumnos: number;
}

@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findAll() {
        return this.menusService.findAllMenus();
    }

    @Get('historial')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    getHistorial() {
        return this.menusService.getHistorial();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findOne(@Param('id') id: string) {
        return this.menusService.findMenuById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.DIRECTORA)
    createMenu(@Body() dto: CreateMenuRequestDto) {
        const command = new CreateMenuCommandDto(
            dto.fecha,
            dto.descripcion,
            dto.calorias_totales ?? 0,
        );
        return this.menusService.createMenu(command);
    }

    @Post(':id/servir')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    servirMenu(@Param('id') id: string, @Body() dto: ServirMenuDto) {
        return this.menusService.servirMenu(id, dto.cantidad_alumnos);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.DIRECTORA)
    updateMenu(@Param('id') id: string, @Body() dto: UpdateMenuRequestDto) {
        const command = new UpdateMenuCommandDto(dto.fecha, dto.descripcion, dto.calorias_totales);
        return this.menusService.updateMenu(id, command);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.DIRECTORA)
    deleteMenu(@Param('id') id: string) {
        return this.menusService.deleteMenu(new DeleteMenuCommandDto(id));
    }
}
