import Purchase from "../model/purchase";

export interface PurchaseRepository {
    createPurchase(purchase: Purchase): Promise<Purchase>;
    findAllPurchases(): Promise<Purchase[]>;
    updatePurchase(id: string, purchase: Purchase): Promise<Purchase>;
    deletePurchase(id: string): Promise<void>;
    findById(id: string): Promise<Purchase | null>;
}