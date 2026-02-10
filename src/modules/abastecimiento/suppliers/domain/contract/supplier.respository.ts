import Supplier from "../model/supplier.model";
import  DeleteSupplierCommandDto  from "../../service/dto/DeleteSupplierCommand.dto";
export interface SupplierRepository { 
    createSupplier(supplier: Supplier): Promise<Supplier>;
    updateSupplier(id: string, supplier: Supplier): Promise<Supplier>;
    deleteSupplier(deleteSupplierCommandDto: DeleteSupplierCommandDto): Promise<void>;
    findSupplierByName(name: string): Promise<Supplier | null>;
    findAllSuppliers(): Promise<Supplier[]>;
    findSupplierByTaxId(taxId: string): Promise<Supplier | null>;
    findSupplierById(id: string | undefined): Promise<Supplier | null>;
}   