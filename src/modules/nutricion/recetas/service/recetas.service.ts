import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateRecetaCommandDto } from './dto/CreateRecetaCommand.dto';
import UpdateRecetaCommandDto from './dto/UpdateRecetaCommand.dto';
import DeleteRecetaCommandDto from './dto/DeleteRecetaCommand.dto';
import type { RecetaRepository } from '../domain/contract/receta.repository';
import Receta from '../domain/model/receta';

@Injectable()
export class RecetasService {
    constructor(
        @Inject('RECETA_REPOSITORY')
        private readonly recetaRepository: RecetaRepository,
    ) { }

    async createReceta(dto: CreateRecetaCommandDto): Promise<Receta> {
        const receta = new Receta(dto.getMenuId(), dto.getFoodId(), dto.getQuantity());
        return this.recetaRepository.createReceta(receta);
    }

    async findAllRecetas(): Promise<Receta[]> {
        return this.recetaRepository.findAllRecetas();
    }

    async findRecetaById(id: string): Promise<Receta> {
        const receta = await this.recetaRepository.findRecetaById(id);
        if (!receta) throw new NotFoundException(`Receta con id ${id} no encontrada`);
        return receta;
    }

    async findByMenuId(menu_id: string): Promise<Receta[]> {
        return this.recetaRepository.findByMenuId(menu_id);
    }

    async updateReceta(id: string, dto: UpdateRecetaCommandDto): Promise<Receta> {
        // Construimos directamente con el id — el repository maneja si no existe
        const receta = new Receta('', '', dto.getQuantity(), id);
        return this.recetaRepository.updateReceta(id, receta);
    }

    async deleteReceta(dto: DeleteRecetaCommandDto): Promise<void> {
        // Eliminamos directo — el repository maneja el error si no existe
        return this.recetaRepository.deleteReceta(dto.getId());
    }
}
