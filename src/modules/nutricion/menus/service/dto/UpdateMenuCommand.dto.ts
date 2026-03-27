export default class UpdateMenuCommandDto {
    constructor(
        private readonly fecha?: string,
        private readonly descripcion?: string,
        private readonly calorias_totales?: number,
    ) { }

    getFecha(): string | undefined { return this.fecha; }
    getDescripcion(): string | undefined { return this.descripcion; }
    getCaloriasTotales(): number | undefined { return this.calorias_totales; }
}
