export class PurchaseDetailItemDto {
    private readonly food_name: string;
    private readonly quantity: number;
    private readonly unit_price: number;
    private readonly category?: string;
    private readonly unit?: string;
    private readonly expiration_date?: string;

    constructor(
        food_name: string,
        quantity: number,
        unit_price: number,
        category?: string,
        unit?: string,
        expiration_date?: string
    ) {
        this.food_name = food_name;
        this.quantity = quantity;
        this.unit_price = unit_price;
        this.category = category;
        this.unit = unit;
        this.expiration_date = expiration_date;
    }

    getFoodName(): string {
        return this.food_name;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getUnitPrice(): number {
        return this.unit_price;
    }

    getCategory(): string | undefined {
        return this.category;
    }

    getUnit(): string | undefined {
        return this.unit;
    }

    getExpirationDate(): string | undefined {
        return this.expiration_date;
    }

    getSubtotal(): number {
        return this.quantity * this.unit_price;
    }
}


export class CreatePurchaseCommandDto {
    private readonly supplier_id: string;
    private readonly fund_id: string;
    private readonly total_amount: number;
    private readonly purchase_details: PurchaseDetailItemDto[];

    constructor(
        supplier_id: string,
        fund_id: string,
        total_amount: number,
        purchase_details: PurchaseDetailItemDto[]
    ) {
        this.supplier_id = supplier_id;
        this.fund_id = fund_id;
        this.total_amount = total_amount;
        this.purchase_details = purchase_details;
    }

    getSupplierId(): string {
        return this.supplier_id;
    }

    getFundId(): string {
        return this.fund_id;
    }

    getTotalAmount(): number {
        return this.total_amount;
    }

    getPurchaseDetails(): PurchaseDetailItemDto[] {
        return this.purchase_details;
    }

    calculateTotal(): number {
        return this.purchase_details.reduce(
            (sum, detail) => sum + detail.getSubtotal(),
            0
        );
    }
}
