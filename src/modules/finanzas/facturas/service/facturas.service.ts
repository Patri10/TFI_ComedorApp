import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import type { FacturaRepository } from '../domain/contract/factura.repository';
import Factura from '../domain/model/factura.model';
import { CreateFacturaCommandDto } from './dto/CreateFacturaCommand.dto';
import DeleteFacturaCommandDto from './dto/DeleteFacturaCommand.dto';

@Injectable()
export class FacturasService {
    constructor(
        @Inject('FacturaRepository')
        private readonly facturaRepository: FacturaRepository,
    ) { }

    async createFactura(dto: CreateFacturaCommandDto): Promise<Factura> {
        // Verificar que no exista ya una factura para esa compra
        const existing = await this.facturaRepository.findFacturaByPurchaseId(dto.getPurchaseId());
        if (existing) {
            throw new BadRequestException(`Ya existe una factura asociada a la compra con ID ${dto.getPurchaseId()}`);
        }

        const factura = new Factura(
            dto.getPurchaseId(),
            dto.getInvoiceNumber(),
            dto.getDate(),
            dto.getFileUrl(),
        );

        return this.facturaRepository.createFactura(factura);
    }

    async findAll(): Promise<Factura[]> {
        return this.facturaRepository.findAllFacturas();
    }

    async findOne(id: string): Promise<Factura> {
        const factura = await this.facturaRepository.findFacturaById(id);
        if (!factura) {
            throw new NotFoundException(`Factura con ID ${id} no encontrada`);
        }
        return factura;
    }

    async findByPurchaseId(purchaseId: string): Promise<Factura | null> {
        return this.facturaRepository.findFacturaByPurchaseId(purchaseId);
    }

    async deleteFactura(dto: DeleteFacturaCommandDto): Promise<void> {
        const existing = await this.facturaRepository.findFacturaById(dto.getId());
        if (!existing) {
            throw new NotFoundException(`Factura con ID ${dto.getId()} no encontrada`);
        }
        return this.facturaRepository.deleteFactura(dto.getId());
    }

    async uploadPdf(purchaseId: string, file: { buffer: Buffer; mimetype: string; originalname: string }): Promise<string> {
        const repo = this.facturaRepository as any;
        if (typeof repo.uploadPdfToStorage !== 'function') {
            throw new Error('El repositorio no soporta carga de archivos PDF');
        }
        return repo.uploadPdfToStorage(purchaseId, file.buffer, file.mimetype);
    }
}
