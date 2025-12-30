export default class UpdatePatchPurchaseCommandDto {
    private readonly id: string;
    private readonly supplier_id: string;
    private readonly fund_id: string;
    private readonly date: Date;
    private readonly total_amount: number;
    private readonly invoice_number: string;

    constructor(
        id: string,
        supplier_id: string,
        fund_id: string,
        date: Date,
        total_amount: number,
        invoice_number: string
    ) {
        this.id = id;
        this.supplier_id = supplier_id;
        this.fund_id = fund_id; 
        this.date = date;
        this.total_amount = total_amount;
        this.invoice_number = invoice_number;
    }

    public getId() {
        return this.id;
    }
    public getSupplierId() {
        return this.supplier_id;
    }
    public getFundId() {
        return this.fund_id;
    }
    public getDate() {
        return this.date;
    }
    public getTotalAmount() {
        return this.total_amount;
    }
    public getInvoiceNumber() {
        return this.invoice_number;
    }
}


