import { Controller, Get } from '@nestjs/common';
import { ComprasService } from '../../../application/compras/services/compras.service';

@Controller('compras')
export class ComprasController {
    constructor(private readonly service: ComprasService) { }

    @Get()
    async list() {
        return this.service.list();
    }
}
