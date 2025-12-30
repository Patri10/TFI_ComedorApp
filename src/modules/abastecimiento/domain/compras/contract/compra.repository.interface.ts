<<<<<<< HEAD
import { CompraEntity } from '../model/compra';
=======
import { CompraEntity } from '../model/compra.entity';
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9

export interface CompraRepository {
    findAll(): Promise<CompraEntity[]>;
}
