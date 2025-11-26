import { Inject, Injectable } from '@nestjs/common';
import type { ProveedorRepository } from '../../../domain/proveedores/contract/proveedor.repository.interface';
import { ProveedorEntity } from '../../../domain/proveedores/model/proveedor.entity';
import { CreateProveedorDto } from '../dto/create-proveedor.dto';

@Injectable()
export class ProveedoresService {
    constructor(
        @Inject('ProveedorRepository')
        private readonly proveedorRepo: ProveedorRepository,
    ) { }

    async list(): Promise<ProveedorEntity[]> {
        return this.proveedorRepo.findAll();
    }

    async get(id: string): Promise<ProveedorEntity | null> {
        return this.proveedorRepo.findById(id);
    }

    async create(dto: CreateProveedorDto): Promise<ProveedorEntity> {
        return this.proveedorRepo.create({ nombre: dto.nombre, cuit: dto.cuit });
    }
}
