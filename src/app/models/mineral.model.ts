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
    if (this.tamanoGrano > 30) return 'GRANO_MUY_GRUESO';
    if (this.tamanoGrano >= 5 && this.tamanoGrano <= 30) return 'GRANO_GRUESO';
    if (this.tamanoGrano >= 2 && this.tamanoGrano < 5) return 'GRANO_MEDIO';
    if (this.tamanoGrano < 2) return 'GRANO_FINO';
    return "";
  }

  cloneWith(changes: {
    dureza?: number;
    temperatura?: number;
    tamanoCristal?: number;
  }): Mineral {
    return new Mineral(
      this.id,
      this.nombre,
      this.origen,
      changes.dureza ?? this.dureza,
      this.tamanoGrano,
      this.clasificacion,
      changes.tamanoCristal ?? this.tamanoCristal,
      changes.temperatura ?? this.temperatura,
      this.estructura,
      this.textura
    );
  }
}
