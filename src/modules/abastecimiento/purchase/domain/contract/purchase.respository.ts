import Purchase from "../model/purchase";
import UpdatePurchaseCommandDto from "../../service/dto/UpdatePurchaseCommand.dto";

export interface PurchaseRepository {
    createPurchase(purchase: Purchase): Promise<Purchase>;
    findAllPurchases(): Promise<Purchase[]>;
    updatePurchase(id: string, purchase: Purchase): Promise<Purchase>;
    deletePurchase(id: string): Promise<void>;
    findByInvoiceNumber(invoiceNumber: string | undefined): Promise<Purchase | null>;
    findById(id: string): Promise<Purchase | null>;
}   