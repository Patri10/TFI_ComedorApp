import { CompraEntity } from '../../../domain/compras/model/compra';

export class CompraResponseDto {
    static from(entity: CompraEntity) {
        return { id: entity.id, proveedorId: entity.proveedorId, total: entity.total };
    }
}
