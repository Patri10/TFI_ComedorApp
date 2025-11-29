import { Injectable } from '@nestjs/common';


@Injectable()
export class ProveedoresService {


  findAll() {
    return `This action returns all proveedores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proveedore`;
  }



  remove(id: number) {
    return `This action removes a #${id} proveedore`;
  }
}
