import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { RecetasService } from '../service/recetas.service';
import { Roles } from '../../../auth/roles.decorator';
import { UserRole } from '../../../users/domain/model/user';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { CreateRecetaRequestDto } from './dto/CreateRecetaRequest.dto';
import { CreateRecetaCommandDto } from '../service/dto/CreateRecetaCommand.dto';
import UpdateRecetaRequestDto from './dto/UpdateRecetaRequest.dto';
import UpdateRecetaCommandDto from '../service/dto/UpdateRecetaCommand.dto';
import DeleteRecetaCommandDto from '../service/dto/DeleteRecetaCommand.dto';

@Controller('recetas')
export class RecetasController {
    constructor(private readonly recetasService: RecetasService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findAll() {
        return this.recetasService.findAllRecetas();
    }

    @Get('menu/:menu_id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findByMenuId(@Param('menu_id') menu_id: string) {
        return this.recetasService.findByMenuId(menu_id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findOne(@Param('id') id: string) {
        return this.recetasService.findRecetaById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.DIRECTORA)
    createReceta(@Body() dto: CreateRecetaRequestDto) {
        const command = new CreateRecetaCommandDto(dto.menu_id, dto.food_id, dto.quantity);
        return this.recetasService.createReceta(command);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.DIRECTORA)
    updateReceta(@Param('id') id: string, @Body() dto: UpdateRecetaRequestDto) {
        const command = new UpdateRecetaCommandDto(dto.quantity);
        return this.recetasService.updateReceta(id, command);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.DIRECTORA)
    deleteReceta(@Param('id') id: string) {
        return this.recetasService.deleteReceta(new DeleteRecetaCommandDto(id));
    }
}
