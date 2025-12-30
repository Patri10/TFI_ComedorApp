import PurchaseDetail from "../model/purchase_details";

export interface PurchaseDetailsRepository {
    findAllPurchaseDetails(): Promise<PurchaseDetail[]>;
    findPurchaseDetailsByName (name: string): Promise<PurchaseDetail[]>;
}
