import { DetalleCompraEntity } from '../model/detalle_compra.entity';

export interface DetalleCompraRepository {
    findByCompraId(compraId: string): Promise<DetalleCompraEntity[]>;
}
