import { CompraEntity } from '../../../domain/compras/model/compra.entity';

export class CompraResponseDto {
    static from(entity: CompraEntity) {
        return { id: entity.id, proveedorId: entity.proveedorId, total: entity.total };
    }
}
