import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PurchaseService } from '../service/purchase.service';
import { CreatePurchaseRequestDto } from './dto/CreatePurchaseRequest.dto';
import UpdatePurchaseRequestDto from './dto/UpdatePurchaseRequest.dto';
import UpdatePurchaseCommandDto from '../service/dto/UpdatePurchaseCommand.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';
import { UserRole } from '../../../users/domain/model/user';

@Controller('purchases')

export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    findAll() {
        return this.purchaseService.findAllPurchases();
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA)
    createPurchase(@Body() createPurchaseRequestDto: CreatePurchaseRequestDto) {
        //aqui debo transformar al command
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    updatePurchase(@Param('id') id: string, @Body() updatePurchaseRequestDto: UpdatePurchaseRequestDto) {
        const command = new UpdatePurchaseCommandDto(
            id,
            updatePurchaseRequestDto.supplier_id,
            updatePurchaseRequestDto.fund_id,
            updatePurchaseRequestDto.date,
            updatePurchaseRequestDto.total_amount,
            updatePurchaseRequestDto.invoice_number,
            
        );

        return this.purchaseService.updatePurchase(command);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
    deletePurchase(@Param('id') id: string) {
        return this.purchaseService.deletePurchase(id);
    }



}