import { FundType } from '../domain/model/fund-type.enum';

export class CreateFondoDto {
    month: number;
    year: number;
    initialAmount: number;
    fundType: FundType;
}
