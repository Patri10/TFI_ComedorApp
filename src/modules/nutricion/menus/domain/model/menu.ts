import RecipeItem from './recipe_item';

export default class Menu {
    public constructor(
        private readonly fecha: Date,
        private readonly descripcion: string,
        private readonly calorias_totales: number,
        private readonly recipes: RecipeItem[],
        private readonly id?: string,
    ) { }

    public getId(): string | undefined { return this.id; }
    public getFecha(): Date { return this.fecha; }
    public getDescripcion(): string { return this.descripcion; }
    public getCaloriasTotales(): number { return this.calorias_totales; }
    public getRecipes(): RecipeItem[] { return this.recipes; }
}