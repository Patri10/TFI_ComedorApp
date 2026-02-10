import Fund from '../model/fund.model';
import { FundType } from '../model/fund-type.enum';

export interface FundRepository {
    createFund(fund: Fund): Promise<Fund>;
    findAllFunds(): Promise<Fund[]>;
    findFundById(id: string): Promise<Fund | null>;
    findFundsByType(fundType: FundType): Promise<Fund[]>;
    findFundsByMonthAndYear(month: number, year: number): Promise<Fund[]>;
    updateFund(id: string, fund: Fund): Promise<Fund>;
    deleteFund(id: string): Promise<void>;
    updateRemainingAmount(id: string, newAmount: number): Promise<Fund>;
}
