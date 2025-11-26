import { MenuDetalle } from '../model/menu-detalle.model';

export interface MenuDetalleRepository {
    create(data: Partial<MenuDetalle>): Promise<MenuDetalle>;
    findByMenuId(menuId: string): Promise<MenuDetalle[]>;
    delete(id: string): Promise<void>;
}
