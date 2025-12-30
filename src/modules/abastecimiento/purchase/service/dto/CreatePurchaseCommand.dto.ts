import PurchaseDetail from "../../domain/model/purchase_details";

export default class CreatePurchaseCommandDto {
    private readonly supplier_id: string;
    private readonly fund_id: string;
    private readonly total_amount: number;
    private readonly invoice_number: string;
    private readonly purchase_details: PurchaseDetail[];

    constructor(
        supplier_id: string,
        fund_id: string,
        total_amount: number,
        invoice_number: string,
        purchase_details: PurchaseDetail[]
    ) {
        this.supplier_id = supplier_id;
        this.fund_id = fund_id;
        this.total_amount = total_amount;
        this.invoice_number = invoice_number;
        this.purchase_details = purchase_details;
    }

    public getSupplierId(): string {
        return this.supplier_id;
    }

    public getFundId(): string {
        return this.fund_id;
    }

    public getTotalAmount(): number {
        return this.total_amount;
    }

    public getInvoiceNumber(): string {
        return this.invoice_number;
    }

    public getPurchaseDetails(): PurchaseDetail[] {
        return this.purchase_details;
    }
}
