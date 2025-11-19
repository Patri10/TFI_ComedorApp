import { Injectable } from '@nestjs/common';
import { CreateFondoDto } from './dto/create-fondo.dto';
import { UpdateFondoDto } from './dto/update-fondo.dto';

@Injectable()
export class FondosService {
  create(createFondoDto: CreateFondoDto) {
    return 'This action adds a new fondo';
  }

  findAll() {
    return `This action returns all fondos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fondo`;
  }

  update(id: number, updateFondoDto: UpdateFondoDto) {
    return `This action updates a #${id} fondo`;
  }

  remove(id: number) {
    return `This action removes a #${id} fondo`;
  }
}
