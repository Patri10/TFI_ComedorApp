import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { MenuDetalleRepository } from '../domain/contract/menu-detalle.repository';
import { CreateMenuDetalleDto } from './dto/create-menu-detalle.dto';
import { MenuDetalle } from '../domain/model/menu-detalle.model';

@Injectable()
export class MenuDetalleService {
    constructor(
        @Inject('MenuDetalleRepository')
        private readonly repo: MenuDetalleRepository,
    ) { }

    async create(menuId: string, dto: CreateMenuDetalleDto): Promise<MenuDetalle> {
        // Validaciones simples
        if (!dto.alimento_id) throw new BadRequestException('alimento_id is required');
        if (!dto.cantidad || dto.cantidad <= 0) throw new BadRequestException('cantidad must be greater than 0');
        if (!dto.unidad) throw new BadRequestException('unidad is required');

        // TODO: Verificar que el menú exista (consultar MenusService o repositorio de menus)
        // TODO: Verificar stock de alimento antes de crear (consultar inventario/servicio correspondiente)

        const data: Partial<MenuDetalle> = {
            menu_id: menuId,
            alimento_id: dto.alimento_id,
            cantidad: dto.cantidad,
            unidad: dto.unidad,
            variante: dto.variante,
            observacion: dto.observacion,
        };

        return this.repo.create(data);
    }

    async findByMenuId(menuId: string): Promise<MenuDetalle[]> {
        return this.repo.findByMenuId(menuId);
    }

    async delete(detalleId: string): Promise<void> {
        return this.repo.delete(detalleId);
    }
}
