import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseService } from '../service/purchase.service';
import { CreatePurchaseRequestDto } from './dto/CreatePurchaseRequest.dto';
import CreatePurchaseCommandDto from '../service/dto/CreatePurchaseCommand.dto';
import UpdatePurchaseRequestDto from './dto/UpdatePurchaseRequest.dto';
import UpdatePurchaseCommandDto from '../service/dto/UpdatePurchaseCommand.dto';
import PurchaseDetail from '../domain/model/purchase_details';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  createPurchase(@Body() createPurchaseRequestDto: CreatePurchaseRequestDto) {
    // TODO: The CreatePurchaseRequestDto.purchase_details is currently typed as number[]
    // but should be an array of objects with {food_id, quantity, unit_price, purchase_id}
    // For now, passing empty array until the DTO is fixed
    const purchaseDetails: PurchaseDetail[] = [];
    
    const command = new CreatePurchaseCommandDto(
      createPurchaseRequestDto.supplier_id,
      createPurchaseRequestDto.fund_id,
      createPurchaseRequestDto.total_amount,
      createPurchaseRequestDto.invoice_number,
      purchaseDetails
    );
    return this.purchaseService.createPurchase(command);
  }

  @Get()
  findAllPurchases() {
    return this.purchaseService.findAllPurchases();
  }

  @Patch(':id')
  updatePurchase(@Param('id') id: string, @Body() updatePurchaseRequestDto: UpdatePurchaseRequestDto) {
    const command = new UpdatePurchaseCommandDto(
      id,
      updatePurchaseRequestDto.supplier_id,
      updatePurchaseRequestDto.fund_id,
      updatePurchaseRequestDto.date,
      updatePurchaseRequestDto.total_amount,
      updatePurchaseRequestDto.invoice_number
    );
    return this.purchaseService.updatePurchase(command);
  }

  @Delete(':id')
  deletePurchase(@Param('id') id: string) {
    return this.purchaseService.deletePurchase(id);
  }
}
