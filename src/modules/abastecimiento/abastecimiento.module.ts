import { Module } from '@nestjs/common';

// Proveedores
import { ProveedoresController } from './presentation/proveedores/controllers/proveedores.controller';
import { ProveedoresService } from './application/proveedores/services/proveedor.service';
import { ProveedorRepositoryImpl } from './infrastructure/proveedores/repositories/proveedor.repository';

// Compras
import { ComprasController } from './presentation/compras/controllers/compras.controller';
import { ComprasService } from './application/compras/services/compras.service';
import { CompraRepositoryImpl } from './infrastructure/compras/repositories/compra.repository';

// DetalleCompra
import { DetalleCompraRepositoryImpl } from './infrastructure/detalle_compra/repositories/detalle_compra.repository';
import { DetalleCompraService } from './application/detalle_compra/services/detalle_compra.service';
import { DetalleCompraController } from './presentation/detalle_compra/controllers/detalle_compra.controller';

@Module({
    controllers: [ProveedoresController, ComprasController, DetalleCompraController],
    providers: [
        // Servicios
        ProveedoresService,
        ComprasService,
        DetalleCompraService,

        // Repositorios (tokens)
        { provide: 'ProveedorRepository', useClass: ProveedorRepositoryImpl },
        { provide: 'CompraRepository', useClass: CompraRepositoryImpl },
        { provide: 'DetalleCompraRepository', useClass: DetalleCompraRepositoryImpl },
    ],
    exports: [ProveedoresService, ComprasService, DetalleCompraService],
})
export class AbastecimientoModule { }
