import Menu from '../model/menu';

export interface ServicioResult {
    menu_id: string;
    fecha_servicio: string;
    cantidad_alumnos: number;
    ingredientes_descontados: {
        food_id: string;
        food_name: string;
        quantity_per_portion: number;
        total_descontado: number;
        unit: string;
    }[];
}

export interface ServicioHistorial {
    id: string;
    menu_id: string;
    menu_descripcion: string;
    fecha_servicio: string;
    cantidad_alumnos: number;
    created_at: string;
}

export interface MenuRepository {
    createMenu(menu: Menu): Promise<Menu>;
    findAllMenus(): Promise<Menu[]>;
    findMenuById(id: string): Promise<Menu | null>;
    updateMenu(id: string, menu: Menu): Promise<Menu>;
    deleteMenu(id: string): Promise<void>;
    servirMenu(id: string, cantidadAlumnos: number): Promise<ServicioResult>;
    getHistorial(): Promise<ServicioHistorial[]>;
}