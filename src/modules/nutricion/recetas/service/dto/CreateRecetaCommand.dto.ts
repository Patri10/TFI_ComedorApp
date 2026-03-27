export class CreateRecetaCommandDto {
    constructor(
        private readonly menu_id: string,
        private readonly food_id: string,
        private readonly quantity: number,
    ) { }

    getMenuId(): string { return this.menu_id; }
    getFoodId(): string { return this.food_id; }
    getQuantity(): number { return this.quantity; }
}
