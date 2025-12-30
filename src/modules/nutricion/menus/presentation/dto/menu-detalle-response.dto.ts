import { MenuDetalle } from '../../domain/model/menu-detalle.model';

export class MenuDetalleResponseDto {
    id!: string;
    menu_id!: string;
    alimento_id!: string;
    cantidad!: number;
    unidad!: string;
    variante!: string;
    observacion?: string;

    static from(entity: MenuDetalle) {
        return {
            id: entity.id,
            menu_id: entity.menu_id,
            alimento_id: entity.alimento_id,
            cantidad: entity.cantidad,
            unidad: entity.unidad,
            variante: entity.variante,
            observacion: entity.observacion,
        };
    }
}
