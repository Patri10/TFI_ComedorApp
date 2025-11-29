import { Injectable } from '@nestjs/common';


@Injectable()
export class ComprasService {

  findAll() {
    return `This action returns all compras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compra`;
  }



  remove(id: number) {
    return `This action removes a #${id} compra`;
  }
}
