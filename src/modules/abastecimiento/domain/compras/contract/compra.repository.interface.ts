import { CompraEntity } from '../model/compra.entity';

export interface CompraRepository {
    findAll(): Promise<CompraEntity[]>;
}
