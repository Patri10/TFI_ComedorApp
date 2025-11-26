import { Injectable, Inject } from '@nestjs/common';
import type { CompraRepository } from '../../../domain/compras/contract/compra.repository.interface';
import { CompraEntity } from '../../../domain/compras/model/compra.entity';

@Injectable()
export class ComprasService {
    constructor(
        @Inject('CompraRepository')
        private readonly repo: CompraRepository,
    ) { }

    async list(): Promise<CompraEntity[]> {
        return this.repo.findAll();
    }
}
