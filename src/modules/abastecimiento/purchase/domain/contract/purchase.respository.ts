import Purchase from "../model/purchase";
import UpdatePurchaseCommandDto from "../../service/dto/UpdatePurchaseCommand.dto";

export interface PurchaseRepository {
    createPurchase(purchase: Purchase): Promise<Purchase>;
    findAllPurchases(): Promise<Purchase[]>;
    updatePurchase(purchase: UpdatePurchaseCommandDto): Promise<Purchase>;
    deletePurchase(id: string): Promise<void>;
}