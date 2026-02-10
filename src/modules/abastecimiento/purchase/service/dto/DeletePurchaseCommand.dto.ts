
export default class DeletePurchaseCommand{

    private readonly id: string;

    public constructor(
        id: string,
    ) {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }
} 