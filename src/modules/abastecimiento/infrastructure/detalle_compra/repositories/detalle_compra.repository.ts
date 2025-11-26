import { Injectable } from '@nestjs/common';
import { DetalleCompraRepository } from '../../../domain/detalle_compra/contract/detalle_compra.repository.interface';
import { DetalleCompraEntity } from '../../../domain/detalle_compra/model/detalle_compra.entity';

@Injectable()
export class DetalleCompraRepositoryImpl implements DetalleCompraRepository {
    async findByCompraId(compraId: string): Promise<DetalleCompraEntity[]> {
        return [];
    }
}
