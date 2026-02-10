import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { PurchaseService } from '../service/purchase.service';
import { Roles } from '../../../auth/roles.decorator';
import { UserRole } from '../../../users/domain/model/user';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { CreatePurchaseRequestDto } from '../presentation/dto/CreatePurchaseRequest.dto';
import { CreatePurchaseCommandDto, PurchaseDetailItemDto } from '../service/dto/CreatePurchaseCommand.dto';
import UpdatePurchaseRequestDto from './dto/UpdatePurchaseRequest.dto';
import UpdatePurchaseCommandDto from '../service/dto/UpdatePurchaseCommand.dto';
import DeletePurchaseCommandDto from '../service/dto/DeletePurchaseCommand.dto';
import DeletePurchaseRequestDto from './dto/DeletePurchaseRequest.dto';

@Controller('compras')
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findAll() {
        return this.purchaseService.findAllPurchases();
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    createPurchase(@Body() createPurchaseRequestDto: CreatePurchaseRequestDto) {
        const details = createPurchaseRequestDto.purchase_details.map(
            (detail) =>
                new PurchaseDetailItemDto(
                    detail.food_id,
                    detail.quantity,
                    detail.unit_price,
                ),
        );

        // Calcular el total_amount sumando los subtotales de los detalles
        const totalAmount = details.reduce(
            (sum, detail) => sum + detail.getSubtotal(),
            0,
        );

        const command = new CreatePurchaseCommandDto(
            createPurchaseRequestDto.supplier_id,
            createPurchaseRequestDto.fund_id,
            totalAmount,
            createPurchaseRequestDto.invoice_number,
            details,
        );

        return this.purchaseService.createPurchase(command);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    updatePurchase(
        @Param('id') id: string,
        @Body() updatePurchaseRequestDto: UpdatePurchaseRequestDto,
        @Req() req: any,
    ) {
        let details: PurchaseDetailItemDto[] | undefined;

        if (updatePurchaseRequestDto.purchase_details) {
            details = updatePurchaseRequestDto.purchase_details.map((detail) => {
                if (!detail.food_id || !detail.quantity || !detail.unit_price) {
                    throw new BadRequestException(
                        'Si se actualizan los detalles, food_id, quantity y unit_price son requeridos en cada item.',
                    );
                }
                return new PurchaseDetailItemDto(
                    detail.food_id,
                    detail.quantity,
                    detail.unit_price,
                );
            });
        }

        const command = new UpdatePurchaseCommandDto(
            updatePurchaseRequestDto.supplier_id,
            updatePurchaseRequestDto.fund_id,
            updatePurchaseRequestDto.invoice_number,
            updatePurchaseRequestDto.total_amount,
            updatePurchaseRequestDto.date,
            details,
        );

        // Extraer el rol del usuario desde el request (inyectado por JwtAuthGuard/Passport)
        const userRole = req.user?.role as UserRole;

        return this.purchaseService.updatePurchase(id, command, userRole);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    deletePurchase(
        @Param('id') id: string,
        @Body() deletePurchaseRequestDto: DeletePurchaseRequestDto,
    ) {
        const command = new DeletePurchaseCommandDto(id);
        return this.purchaseService.deletePurchase(command);
    }
}
