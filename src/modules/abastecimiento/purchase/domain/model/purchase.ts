import { get } from "http";
import Purchase_details from "./purchase_details";

export default class Purchase{
    public constructor(
        private readonly supplier_id: string,
        private readonly fund_id:string,
        private readonly date: Date,
        private readonly total_amount: number,
        private readonly invoice_number: string,
        private readonly purchase_details: Purchase_details[],
        private readonly id?:string

    ) {} 
 
    getSupplierId() {
        return this.supplier_id;
    }
    getFundId() {
        return this.fund_id;
    }
    getDate() {
        return this.date;
    }
    getTotalAmount() {
        return this.total_amount;
    }
    getInvoiceNumber() {
        return this.invoice_number;
    }
    getPurchaseDetails() {
        return this.purchase_details;
    }
    getId() {
        return this.id;
    }
}