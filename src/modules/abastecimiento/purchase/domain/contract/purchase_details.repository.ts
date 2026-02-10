import PurchaseDetail from "../model/purchase_details";

export interface PurchaseDetailsRepository {
    createPurchaseDetail(purchaseDetail: PurchaseDetail): Promise<PurchaseDetail>;
    findPurchaseDetailById(id: string): Promise<PurchaseDetail | null>;
    findAllPurchaseDetails(): Promise<PurchaseDetail[]>;
    updatePurchaseDetail(purchaseDetail: PurchaseDetail): Promise<PurchaseDetail>;
    deletePurchaseId(purchase_id: string): Promise<void>;
}
