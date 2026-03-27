export default class purchaseDetail {
    private readonly id?: string;
    private readonly purchase_id: string;
    private readonly food_id: string | null;
    private readonly food_name: string;
    private readonly quantity: number;
    private readonly unit_price: number;

    public constructor(
        purchase_id: string,
        food_id: string | null,
        quantity: number,
        unit_price: number,
        id?: string,
        food_name?: string,
    ) {
        this.id = id;
        this.purchase_id = purchase_id;
        this.food_id = food_id;
        this.food_name = food_name ?? '';
        this.quantity = quantity;
        this.unit_price = unit_price;
    }

    public getId(): string | undefined {
        return this.id;
    }

    public getPurchaseId(): string {
        return this.purchase_id;
    }

    public getFoodId(): string | null {
        return this.food_id;
    }

    public getFoodName(): string {
        return this.food_name;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getUnitPrice(): number {
        return this.unit_price;
    }
}