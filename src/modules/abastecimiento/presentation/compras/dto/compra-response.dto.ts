import { CompraEntity } from '../../../domain/compras/model/compra';

export class CompraResponseDto {
    static from(entity: CompraEntity) {
        return { };
    }
}
