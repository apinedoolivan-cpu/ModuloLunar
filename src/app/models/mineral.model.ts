import {
  OrigenMaterialLunar,
  ClasificacionMaterialLunar,
  TexturaMaterialLunar
} from './enums.model';
export interface ICapturable {
  capturar(): Mineral;
}
export class Mineral implements ICapturable {
  constructor(
    public id: string,
    public nombre: string,
    public origen: OrigenMaterialLunar,
    public dureza: number,
    public tamanoGrano: number,
    public clasificacion: ClasificacionMaterialLunar,
    public tamanoCristal: number,
    public temperatura: number,
    public estructura: string,
    public textura: TexturaMaterialLunar
  ) {}

  capturar(): Mineral {
    return this;
  }

  dametamanoGrano(): string {
    if (this.tamanoGrano > 30) return 'Grano muy grueso';
    if (this.tamanoGrano >= 5 && this.tamanoGrano <= 30) return 'Grano grueso';
    if (this.tamanoGrano >= 2 && this.tamanoGrano < 5) return 'Grano medio';
    if (this.tamanoGrano < 2) return 'Grano fino';
    return 'Indefinido';
  }
}
