import { ProveedorEntity } from '../../../domain/proveedores/model/proveedor.entity';

export class ProveedorResponseDto {
    static from(entity: ProveedorEntity) {
        return { id: entity.id, nombre: entity.nombre, cuit: entity.cuit };
    }
}
