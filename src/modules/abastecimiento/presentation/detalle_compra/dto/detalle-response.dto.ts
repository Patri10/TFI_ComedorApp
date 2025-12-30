import { DetalleCompraEntity } from '../../../domain/detalle_compra/model/detalle_compra.entity';

export class DetalleCompraResponseDto {
    static from(entity: DetalleCompraEntity) {
        return { id: entity.id, compraId: entity.compraId, producto: entity.producto, cantidad: entity.cantidad };
    }
}
