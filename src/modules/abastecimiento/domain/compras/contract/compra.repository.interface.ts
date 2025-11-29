import { CompraEntity } from '../model/compra';

export interface CompraRepository {
    findAll(): Promise<CompraEntity[]>;
}
