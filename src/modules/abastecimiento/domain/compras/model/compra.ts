export class CompraEntity {
    private readonly fecha: Date = new Date();
    private readonly total: number;
    private readonly numeroFactura: string;
    private readonly proveedorId: string;
    private readonly id: string;

    public constructor(
        id: string,
        proveedorId: string,
        total: number,
        numeroFactura: string,
    ) {
        this.id = id;
        this.proveedorId = proveedorId;
        this.total = total;
        this.numeroFactura = numeroFactura;
    }

    getId(): string {
        return this.id;
    }

    getFecha(): Date {
        return this.fecha;
    }

    getTotal(): number {
        return this.total;
    }

    getNumeroFactura(): string {
        return this.numeroFactura;
    }

    getProveedorId(): string {
        return this.proveedorId;
    }   
}
