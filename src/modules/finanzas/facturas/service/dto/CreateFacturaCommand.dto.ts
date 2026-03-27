export class CreateFacturaCommandDto {
    private readonly purchase_id: string;
    private readonly invoice_number: string;
    private readonly date: Date;
    private readonly file_url?: string;

    constructor(
        purchase_id: string,
        invoice_number: string,
        date: Date,
        file_url?: string,
    ) {
        this.purchase_id = purchase_id;
        this.invoice_number = invoice_number;
        this.date = date;
        this.file_url = file_url;
    }

    getPurchaseId(): string {
        return this.purchase_id;
    }

    getInvoiceNumber(): string {
        return this.invoice_number;
    }

    getDate(): Date {
        return this.date;
    }

    getFileUrl(): string | undefined {
        return this.file_url;
    }
}
