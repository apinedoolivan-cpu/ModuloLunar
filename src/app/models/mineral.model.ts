import {
  OrigenMaterialLunar,
  ClasificacionMaterialLunar,
  TexturaMaterialLunar
} from './enums.model';
import { ICapturable } from './interfaces.model';

export class Mineral implements ICapturable {
  constructor(
    public id: string,
    public nombre: string,
    public origen: OrigenMaterialLunar,
    public dureza: number,
    public tamañoGrano: number,
    public clasificacion: ClasificacionMaterialLunar,
    public tamañoCristal: number,
    public temperaturaFormacion: number,
    public estructura: string,
    public textura: TexturaMaterialLunar
  ) {}

  capturar(): Mineral {
    return this;
  }

  dameTamañoGrano(): string {
    if (this.tamañoGrano > 30) return 'Grano muy grueso';
    if (this.tamañoGrano >= 5 && this.tamañoGrano <= 30) return 'Grano grueso';
    if (this.tamañoGrano >= 2 && this.tamañoGrano < 5) return 'Grano medio';
    if (this.tamañoGrano < 2) return 'Grano fino';
    return 'Indefinido';
  }
}
