import {
    Controller, Get, Post, Delete,
    Body, Param, UseGuards,
    UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FacturasService } from '../service/facturas.service';
import { Roles } from '../../../auth/roles.decorator';
import { UserRole } from '../../../users/domain/model/user';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { CreateFacturaRequestDto } from './dto/CreateFacturaRequest.dto';
import { CreateFacturaCommandDto } from '../service/dto/CreateFacturaCommand.dto';
import DeleteFacturaCommandDto from '../service/dto/DeleteFacturaCommand.dto';

@Controller('facturas')
export class FacturasController {
    constructor(private readonly facturasService: FacturasService) { }

    /**
     * GET /facturas
     * Lista todas las facturas
     */
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findAll() {
        return this.facturasService.findAll();
    }

    /**
     * GET /facturas/:id
     * Obtiene una factura por ID
     */
    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findOne(@Param('id') id: string) {
        return this.facturasService.findOne(id);
    }

    /**
     * GET /facturas/compra/:purchaseId
     * Obtiene la factura asociada a una compra
     */
    @Get('compra/:purchaseId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findByPurchaseId(@Param('purchaseId') purchaseId: string) {
        return this.facturasService.findByPurchaseId(purchaseId);
    }

    /**
     * POST /facturas
     * Crea una factura para una compra existente.
     * Acepta opcionalmente un archivo PDF (multipart/form-data).
     * Al crear la factura, la compra pasa a estado 'pagada'.
     */
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    @UseInterceptors(FileInterceptor('pdf'))
    async createFactura(
        @Body() body: CreateFacturaRequestDto,
        @UploadedFile() pdfFile?: { buffer: Buffer; mimetype: string; originalname: string },
    ) {
        let fileUrl: string | undefined;

        if (pdfFile) {
            // Delegar la subida al repositorio a través del servicio
            fileUrl = await (this.facturasService as any).uploadPdf(body.purchase_id, pdfFile);
        }

        const command = new CreateFacturaCommandDto(
            body.purchase_id,
            body.invoice_number,
            new Date(body.date),
            fileUrl ?? body.file_url,
        );

        return this.facturasService.createFactura(command);
    }

    /**
     * DELETE /facturas/:id
     * Elimina una factura
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    deleteFactura(@Param('id') id: string) {
        const command = new DeleteFacturaCommandDto(id);
        return this.facturasService.deleteFactura(command);
    }
}
