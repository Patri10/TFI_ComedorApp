import { Controller, Get, Param } from '@nestjs/common';
import { DetalleCompraService } from '../../../application/detalle_compra/services/detalle_compra.service';

@Controller('detalle-compra')
export class DetalleCompraController {
    constructor(private readonly service: DetalleCompraService) { }

    @Get('compra/:compraId')
    async byCompra(@Param('compraId') compraId: string) {
        return this.service.findByCompra(compraId);
    }
}
