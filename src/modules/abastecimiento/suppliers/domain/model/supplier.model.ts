export default class Supplier {
    private readonly name: string;
    private readonly tax_id: string;
    private readonly contact: string;
    private readonly address: string;
    private readonly id?: string;

    public constructor(
        name: string,
        tax_id: string,
        contact: string, 
        address: string,
        id?: string,
    ) {
        this.name = name;
        this.tax_id = tax_id;
        this.contact = contact;
        this.address = address;
        this.id = id;
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