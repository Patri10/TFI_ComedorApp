export default class RecipeItem {
    public constructor(
        private readonly menu_id: string,
        private readonly food_id: string,
        private readonly quantity: number,
        private readonly id?: string,
        private readonly food_name?: string,
        private readonly food_unit?: string,
    ) { }

    public getId(): string | undefined { return this.id; }
    public getMenuId(): string { return this.menu_id; }
    public getFoodId(): string { return this.food_id; }
    public getQuantity(): number { return this.quantity; }
    public getFoodName(): string | undefined { return this.food_name; }
    public getFoodUnit(): string | undefined { return this.food_unit; }
}
