import Factura from '../model/factura.model';

export interface FacturaRepository {
    createFactura(factura: Factura): Promise<Factura>;
    findAllFacturas(): Promise<Factura[]>;
    findFacturaById(id: string): Promise<Factura | null>;
    findFacturaByPurchaseId(purchaseId: string): Promise<Factura | null>;
    deleteFactura(id: string): Promise<void>;
}
