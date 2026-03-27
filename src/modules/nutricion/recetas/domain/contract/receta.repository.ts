import Receta from '../model/receta';

export interface RecetaRepository {
    createReceta(receta: Receta): Promise<Receta>;
    findAllRecetas(): Promise<Receta[]>;
    findRecetaById(id: string): Promise<Receta | null>;
    findByMenuId(menu_id: string): Promise<Receta[]>;
    updateReceta(id: string, receta: Receta): Promise<Receta>;
    deleteReceta(id: string): Promise<void>;
}
