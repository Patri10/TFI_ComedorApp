export default class UpdatePatchSupplierCommandDto {
    private readonly id?: string;
    private readonly name?: string;
    private readonly tax_id?: string;
    private readonly contact?: string;
    private readonly address?: string;

    public constructor(
        name?: string,
        tax_id?: string, 
        contact?: string,
        address?: string,
        id?: string,
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
    public getName(): string | undefined {
        return this.name;
    }

    public getTaxId(): string | undefined {
        return this.tax_id;
    }

    public getContact(): string | undefined {
        return this.contact;
    }

    public getAddress(): string | undefined {
        return this.address;
    }
} 