

export default class CreateSupplierCommandDto{

    private readonly id?: string;
    private readonly name: string;
    private readonly tax_id: string;
    private readonly contact: string;
    private readonly address: string;

    public constructor(
        name: string,
        tax_id: string,
        contact: string,
        address: string,
        id?: string
    ) {
        this.id = id;
        this.name = name;
        this.tax_id = tax_id;
        this.contact = contact;
        this.address = address;
    }

    public getId(): string | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getTaxId(): string {
        return this.tax_id;
    }

    public getContact(): string {
        return this.contact;
    }

    public getAddress(): string {
        return this.address;
    }

}