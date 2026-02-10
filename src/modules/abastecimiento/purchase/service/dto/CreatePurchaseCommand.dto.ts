// DTO para cada detalle individual (item de la compra)
export class PurchaseDetailItemDto {
    private readonly food_id: string;
    private readonly quantity: number;
    private readonly unit_price: number;

    constructor(
        food_id: string,
        quantity: number,
        unit_price: number
    ) {
        this.food_id = food_id;
        this.quantity = quantity;
        this.unit_price = unit_price;
    }

    getFoodId(): string {
        return this.food_id;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getUnitPrice(): number {
        return this.unit_price;
    }

    // Método útil: calcular subtotal
    getSubtotal(): number {
        return this.quantity * this.unit_price;
    }
}

// DTO principal para crear una compra
export  class CreatePurchaseCommandDto {
    private readonly supplier_id: string;
    private readonly fund_id: string;
    private readonly total_amount: number;
    private readonly invoice_number: string;
    private readonly purchase_details: PurchaseDetailItemDto[];

    constructor(
        supplier_id: string,
        fund_id: string,
        total_amount: number,
        invoice_number: string,
        purchase_details: PurchaseDetailItemDto[]
    ) {
        this.supplier_id = supplier_id;
        this.fund_id = fund_id;
        this.total_amount = total_amount;
        this.invoice_number = invoice_number;
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

    getInvoiceNumber(): string {
        return this.invoice_number;
    }

    getPurchaseDetails(): PurchaseDetailItemDto[] {
        return this.purchase_details;
    }

    // Método útil: calcular total desde los detalles
    calculateTotal(): number {
        return this.purchase_details.reduce(
            (sum, detail) => sum + detail.getSubtotal(),
            0
        );
    }
}
