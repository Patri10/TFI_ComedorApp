export default class purchaseDetail{
    private readonly id?:string;
    private readonly purchase_id: string;
    private readonly food_id: string;
    private readonly quantity: number;
    private readonly unit_price: number;

    public constructor(
        purchase_id: string,
        food_id: string,
        quantity: number,
        unit_price: number,
        id?: string,
    ) {
        this.id = id;
        this.purchase_id = purchase_id;
        this.food_id = food_id;
        this.quantity = quantity;
        this.unit_price = unit_price;
    } 

    public getId(): string | undefined {
        return this.id;
    }

    public getPurchaseId(): string {
        return this.purchase_id;
    }

    public getFoodId(): string {
        return this.food_id;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getUnitPrice(): number {
        return this.unit_price;
    }
}