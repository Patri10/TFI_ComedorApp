import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ProveedoresService } from '../../../application/proveedores/services/proveedor.service';
import { CreateProveedorDto } from '../../../application/proveedores/dto/create-proveedor.dto';
import { ProveedorEntity } from '../../../domain/proveedores/model/proveedor.entity';

@Controller('proveedores')
export class ProveedoresController {
    constructor(private readonly service: ProveedoresService) { }

    @Get()
    async list(): Promise<ProveedorEntity[]> {
        return this.service.list();
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<ProveedorEntity | null> {
        return this.service.get(id);
    }

    @Post()
    async create(@Body() dto: CreateProveedorDto): Promise<ProveedorEntity> {
        return this.service.create(dto);
    }
}
