import { Injectable } from '@nestjs/common';
import { CreateDetalleCompraDto } from './dto/create-detalle_compra.dto';


@Injectable()
export class DetalleCompraService {
  create(createDetalleCompraDto: CreateDetalleCompraDto) {
    return 'This action adds a new detalleCompra';
  }

  findAll() {
    return `This action returns all detalleCompra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleCompra`;
  }



  remove(id: number) {
    return `This action removes a #${id} detalleCompra`;
  }
}
