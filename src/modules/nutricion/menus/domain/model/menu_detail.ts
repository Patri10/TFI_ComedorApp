export default class MenuDetail {
    public constructor(
        private readonly menu_id: string,
        private readonly food_id: string,
        private readonly quantity: number,
        private readonly id?: string,
    ) { }

    public getId(): string | undefined {
        return this.id;
    }

    public getMenuId(): string {
        return this.menu_id;
    }

    public getFoodId(): string {
        return this.food_id;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}
