import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SupplierService } from '../service/supplier.service';
import CreateSupplierRequestDto from './dto/CreateSupplierRequest.dto';
import CreateSupplierCommandDto from '../service/dto/CreateSupplierCommand.dto';
import UpdateSupplierRequestDto from './dto/UpdateSupplierRequest.dto';
import UpdatePatchSupplierCommandDto from '../service/dto/UpdateSupplierCommand.dto';
import DeleteSupplierRequestDto from './dto/DeleteSupplierRequest.dto';
import DeleteSupplierCommandDto from '../service/dto/DeleteSupplierCommand.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';
import { UserRole } from '../../../users/domain/model/user';

@Controller('suppliers') 
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(UserRole.ADMIN, UserRole.ECONOMA , UserRole.DIRECTORA)
  findAll() {
    return this.supplierService.findAllSuppliers();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
  createSupplier(@Body() createSupplierRequestDto: CreateSupplierRequestDto) {
    const command = new CreateSupplierCommandDto(
      createSupplierRequestDto.name,
      createSupplierRequestDto.tax_id,
      createSupplierRequestDto.contact,
      createSupplierRequestDto.address
    );
    return this.supplierService.createSupplier(command);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
  updateSupplier(@Param('id') id: string, @Body() updateSupplierRequestDto: UpdateSupplierRequestDto) {
    const command = new UpdatePatchSupplierCommandDto(
      updateSupplierRequestDto.name,
      updateSupplierRequestDto.tax_id,
      updateSupplierRequestDto.contact,
      updateSupplierRequestDto.address,
      id
    );
    return this.supplierService.updateSupplier(id, command);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ECONOMA, UserRole.DIRECTORA)
  deleteSupplier(@Param('id') id: string, deleteSupplierRequestDto: DeleteSupplierRequestDto) {
    const command = new DeleteSupplierCommandDto(id);
    return this.supplierService.deleteSupplier(command);
  }
}