import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateMenuCommandDto } from './dto/CreateMenuCommand.dto';
import UpdateMenuCommandDto from './dto/UpdateMenuCommand.dto';
import DeleteMenuCommandDto from './dto/DeleteMenuCommand.dto';
import type { MenuRepository, ServicioResult, ServicioHistorial } from '../domain/contract/menu.repository';
import Menu from '../domain/model/menu';

@Injectable()
export class MenusService {
    constructor(
        @Inject('MENU_REPOSITORY')
        private readonly menuRepository: MenuRepository,
    ) { }

    async createMenu(dto: CreateMenuCommandDto): Promise<Menu> {
        const menu = new Menu(
            new Date(dto.getFecha()),
            dto.getDescripcion(),
            dto.getCaloriasTotales(),
            [],
        );
        return this.menuRepository.createMenu(menu);
    }

    async findAllMenus(): Promise<Menu[]> {
        return this.menuRepository.findAllMenus();
    }

    async findMenuById(id: string): Promise<Menu> {
        const menu = await this.menuRepository.findMenuById(id);
        if (!menu) throw new NotFoundException(`Menú con id ${id} no encontrado`);
        return menu;
    }

    async updateMenu(id: string, dto: UpdateMenuCommandDto): Promise<Menu> {
        const existing = await this.menuRepository.findMenuById(id);
        if (!existing) throw new NotFoundException(`Menú con id ${id} no encontrado`);

        const updated = new Menu(
            dto.getFecha() ? new Date(dto.getFecha()!) : existing.getFecha(),
            dto.getDescripcion() ?? existing.getDescripcion(),
            dto.getCaloriasTotales() ?? existing.getCaloriasTotales(),
            existing.getRecipes(),
            id,
        );

        return this.menuRepository.updateMenu(id, updated);
    }

    async deleteMenu(dto: DeleteMenuCommandDto): Promise<void> {
        const existing = await this.menuRepository.findMenuById(dto.getId());
        if (!existing) throw new NotFoundException(`Menú con id ${dto.getId()} no encontrado`);
        return this.menuRepository.deleteMenu(dto.getId());
    }

    async servirMenu(id: string, cantidadAlumnos: number): Promise<ServicioResult> {
        const existing = await this.menuRepository.findMenuById(id);
        if (!existing) throw new NotFoundException(`Menú con id ${id} no encontrado`);
        return this.menuRepository.servirMenu(id, cantidadAlumnos);
    }

    async getHistorial(): Promise<ServicioHistorial[]> {
        return this.menuRepository.getHistorial();
    }
}
