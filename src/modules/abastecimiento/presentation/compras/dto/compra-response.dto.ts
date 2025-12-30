<<<<<<< HEAD
import { CompraEntity } from '../../../domain/compras/model/compra';

export class CompraResponseDto {
    static from(entity: CompraEntity) {
        return { };
=======
import { CompraEntity } from '../../../domain/compras/model/compra.entity';

export class CompraResponseDto {
    static from(entity: CompraEntity) {
        return { id: entity.id, proveedorId: entity.proveedorId, total: entity.total };
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
    }
}
