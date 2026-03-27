export default class Factura {
    public constructor(
        private readonly purchase_id: string,
        private readonly invoice_number: string,
        private readonly date: Date,
        private readonly file_url?: string | null,
        private readonly id?: string,
    ) { }

    getPurchaseId(): string {
        return this.purchase_id;
    }

    getInvoiceNumber(): string {
        return this.invoice_number;
    }

    getDate(): Date {
        return this.date;
    }

    getFileUrl(): string | null | undefined {
        return this.file_url;
    }

    getId(): string | undefined {
        return this.id;
    }
}
