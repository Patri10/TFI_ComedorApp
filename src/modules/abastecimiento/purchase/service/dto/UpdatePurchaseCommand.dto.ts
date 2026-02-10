import { PurchaseDetailItemDto } from "./CreatePurchaseCommand.dto";

export default class UpdatePurchaseCommandDto {
    private readonly id: string;
    private readonly supplier_id?: string;
    private readonly fund_id?: string;
    private readonly invoice_number?: string;
    private readonly total_amount?: number;
    private readonly date?: Date;
    private readonly purchase_details?: PurchaseDetailItemDto[];

    constructor(
        supplier_id?: string,
        fund_id?: string,
        invoice_number?: string,
        total_amount?: number,
        date?: Date,
        purchase_details?: PurchaseDetailItemDto[]
    ) {
        this.supplier_id = supplier_id;
        this.fund_id = fund_id;
        this.invoice_number = invoice_number;
        this.total_amount = total_amount;
        this.date = date;
        this.purchase_details = purchase_details;
    }

    getId(): string {
        return this.id;
    }

    getSupplierId(): string | undefined {
        return this.supplier_id;
    }

    getFundId(): string | undefined {
        return this.fund_id;
    }

    getInvoiceNumber(): string | undefined {
        return this.invoice_number;
    }

    getTotalAmount(): number | undefined {
        return this.total_amount;
    }
    getDate(): Date | undefined {
        return this.date;
    }
    
    getPurchaseDetails(): PurchaseDetailItemDto[] | undefined {
        return this.purchase_details;
    }

    // nuevo total 
    calculateTotal(): number | undefined {
        if (!this.purchase_details || this.purchase_details.length === 0) {
            return undefined;
        }
        return this.purchase_details.reduce(
            (sum, detail) => sum + detail.getSubtotal(),
            0
        );
    }
}


