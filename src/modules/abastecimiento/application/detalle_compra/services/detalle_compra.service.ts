import { Injectable, Inject } from '@nestjs/common';
import type { DetalleCompraRepository } from '../../../domain/detalle_compra/contract/detalle_compra.repository.interface';
import { DetalleCompraEntity } from '../../../domain/detalle_compra/model/detalle_compra.entity';

@Injectable()
export class DetalleCompraService {
    constructor(
        @Inject('DetalleCompraRepository')
        private readonly repo: DetalleCompraRepository,
    ) { }

    async findByCompra(compraId: string): Promise<DetalleCompraEntity[]> {
        return this.repo.findByCompraId(compraId);
    }
}
