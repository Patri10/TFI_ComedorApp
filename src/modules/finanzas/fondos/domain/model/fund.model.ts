import { FundType } from './fund-type.enum';

export default class Fund {
    private id?: string;
    private month: number;
    private year: number;
    private initialAmount: number;
    private remainingAmount: number;
    private fundType: FundType;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(
        month: number,
        year: number,
        initialAmount: number,
        remainingAmount: number,
        fundType: FundType,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.month = month;
        this.year = year;
        this.initialAmount = initialAmount;
        this.remainingAmount = remainingAmount;
        this.fundType = fundType;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters
    getId(): string | undefined {
        return this.id;
    }

    getMonth(): number {
        return this.month;
    }

    getYear(): number {
        return this.year;
    }

    getInitialAmount(): number {
        return this.initialAmount;
    }

    getRemainingAmount(): number {
        return this.remainingAmount;
    }

    getFundType(): FundType {
        return this.fundType;
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    // Business logic
    hasAvailableFunds(amount: number): boolean {
        return this.remainingAmount >= amount;
    }

    getUsedAmount(): number {
        return this.initialAmount - this.remainingAmount;
    }

    getUsagePercentage(): number {
        if (this.initialAmount === 0) return 0;
        return (this.getUsedAmount() / this.initialAmount) * 100;
    }
}
