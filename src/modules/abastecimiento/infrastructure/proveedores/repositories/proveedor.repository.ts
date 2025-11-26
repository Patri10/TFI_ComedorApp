import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { ProveedorRepository } from '../../../domain/proveedores/contract/proveedor.repository.interface';
import { ProveedorEntity } from '../../../domain/proveedores/model/proveedor.entity';

@Injectable()
export class ProveedorRepositoryImpl implements ProveedorRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabase: SupabaseClient,
    ) { }

    async findAll(): Promise<ProveedorEntity[]> {
        const { data, error } = await this.supabase.from('proveedores').select('*');
        if (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return (data || []) as ProveedorEntity[];
    }

    async findById(id: string): Promise<ProveedorEntity | null> {
        const { data, error } = await this.supabase.from('proveedores').select('*').eq('id', id).limit(1).maybeSingle();
        if (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return (data as ProveedorEntity) || null;
    }

    async create(data: Partial<ProveedorEntity>): Promise<ProveedorEntity> {
        const { data: created, error } = await this.supabase.from('proveedores').insert([{ nombre: data.nombre, cuit: data.cuit }]).select().single();
        if (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return created as ProveedorEntity;
    }
}

