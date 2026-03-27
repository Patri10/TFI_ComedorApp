export default class UpdateRecetaCommandDto {
    constructor(private readonly quantity: number) { }
    getQuantity(): number { return this.quantity; }
}
