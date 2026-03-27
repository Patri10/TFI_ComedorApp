export default class DeleteFacturaCommandDto {
    private readonly id: string;

    public constructor(id: string) {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }
}
