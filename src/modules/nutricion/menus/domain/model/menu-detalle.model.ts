export class MenuDetalle {
    id!: string; // uuid
    menu_id!: string; // uuid referencia a menus
    alimento_id!: string; // uuid referencia a alimentos
    cantidad!: number;
    unidad!: string;
    variante!: string; // e.g. normal, celiaco, sin lactosa
    observacion?: string;
}
