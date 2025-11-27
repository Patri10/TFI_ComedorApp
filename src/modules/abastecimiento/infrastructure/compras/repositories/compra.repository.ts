import { Injectable } from '@nestjs/common';
import { CompraRepository } from '../../../domain/compras/contract/compra.repository.interface';
import { CompraEntity } from '../../../domain/compras/model/compra';

@Injectable()
export class CompraRepositoryImpl implements CompraRepository {
    async findAll(): Promise<CompraEntity[]> {
        return [];
    }
}
