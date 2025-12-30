import { Injectable } from '@nestjs/common';
import { CompraRepository } from '../../../domain/compras/contract/compra.repository.interface';
<<<<<<< HEAD
import { CompraEntity } from '../../../domain/compras/model/compra';
=======
import { CompraEntity } from '../../../domain/compras/model/compra.entity';
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9

@Injectable()
export class CompraRepositoryImpl implements CompraRepository {
    async findAll(): Promise<CompraEntity[]> {
        return [];
    }
}
