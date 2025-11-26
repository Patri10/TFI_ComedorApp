import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { MenuDetalleService } from '../service/menu-detalle.service';
import { CreateMenuDetalleDto } from '../service/dto/create-menu-detalle.dto';
import { MenuDetalleResponseDto } from '../presentation/dto/menu-detalle-response.dto';

@Controller('menus/:id/detalle')
export class MenuDetalleController {
    constructor(private readonly service: MenuDetalleService) { }

    @Post()
    async create(@Param('id') menuId: string, @Body() dto: CreateMenuDetalleDto) {
        const created = await this.service.create(menuId, dto);
        return MenuDetalleResponseDto.from(created);
    }

    @Get()
    async list(@Param('id') menuId: string) {
        const list = await this.service.findByMenuId(menuId);
        return list.map(MenuDetalleResponseDto.from);
    }

    @Delete(':detalleId')
    async remove(@Param('id') menuId: string, @Param('detalleId') detalleId: string) {
        // opcional: verificar que el detalle pertenece al menuId antes de eliminar
        await this.service.delete(detalleId);
        return { ok: true };
    }
}
