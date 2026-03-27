import { PurchaseDetailItemDto } from "./CreatePurchaseCommand.dto";

export default class UpdatePurchaseCommandDto {
    private readonly supplier_id?: string;
    private readonly fund_id?: string;
    private readonly total_amount?: number;
    private readonly date?: Date;
    private readonly status?: string;
    private readonly purchase_details?: PurchaseDetailItemDto[];

    constructor(
        supplier_id?: string,
        fund_id?: string,
        total_amount?: number,
        date?: Date,
        purchase_details?: PurchaseDetailItemDto[],
        status?: string
    ) {
        this.supplier_id = supplier_id;
        this.fund_id = fund_id;
        this.total_amount = total_amount;
        this.date = date;
        this.purchase_details = purchase_details;
        this.status = status;
    }

    getSupplierId(): string | undefined {
        return this.supplier_id;
    }

    getFundId(): string | undefined {
        return this.fund_id;
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

    getStatus(): string | undefined {
        return this.status;
    }

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
