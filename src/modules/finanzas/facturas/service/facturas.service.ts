import { Injectable } from '@nestjs/common';


@Injectable()
export class FacturasService {
  /*create(createFacturaDto: CreateFacturaDto) {
    return 'This action adds a new factura';
  }*/

  findAll() {
    return `This action returns all facturas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} factura`;
  }

  /*update(id: number, updateFacturaDto: UpdateFacturaDto) {
    return `This action updates a #${id} factura`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} factura`;
  }
}
