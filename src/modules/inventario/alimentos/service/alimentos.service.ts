import { Injectable } from '@nestjs/common';


@Injectable()
export class AlimentosService {
  /*create(createAlimentoDto: CreateAlimentoDto) {
    return 'This action adds a new alimento';
  }*/

  findAll() {
    return `This action returns all alimentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alimento`;
  }

  /*update(id: number, updateAlimentoDto: UpdateAlimentoDto) {
    return `This action updates a #${id} alimento`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} alimento`;
  }
}
