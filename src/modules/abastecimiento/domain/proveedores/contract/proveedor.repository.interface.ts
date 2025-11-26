import { ProveedorEntity } from '../model/proveedor.entity';

export interface ProveedorRepository {
    findAll(): Promise<ProveedorEntity[]>;
    findById(id: string): Promise<ProveedorEntity | null>;
    create(data: Partial<ProveedorEntity>): Promise<ProveedorEntity>;
}
