import { Controller } from '@nestjs/common';
import { SupplierService } from '../service/supplier.service';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}
  // TODO: Implement supplier controller endpoints
}
