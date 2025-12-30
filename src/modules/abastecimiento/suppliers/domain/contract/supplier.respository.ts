import suppliers from "../model/supplier.model";

export interface SupplierRepository {
    createSupplier(supplier: suppliers): Promise<suppliers>;
    findAllSuppliers(): Promise<suppliers[]>;
    updateSupplier(supplier: suppliers): Promise<suppliers>;
    deleteSupplier(id: string): Promise<void>;
}