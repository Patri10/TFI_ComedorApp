export class CreateMenuCommandDto {
    constructor(
        private readonly fecha: string,
        private readonly descripcion: string,
        private readonly calorias_totales: number,
    ) { }

    getFecha(): string { return this.fecha; }
    getDescripcion(): string { return this.descripcion; }
    getCaloriasTotales(): number { return this.calorias_totales; }
}
