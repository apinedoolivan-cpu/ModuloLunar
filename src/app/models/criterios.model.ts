import { Mineral } from './mineral.model';
import { OrigenMaterialLunar, TexturaMaterialLunar } from './enums.model';
export interface ICriterioValidacion {
  descripcionKey(): string;
  esValido(mineral: Mineral): boolean;
  dameCriterio(): OrigenMaterialLunar
}
export class CriterioIgneas implements ICriterioValidacion {
  constructor(public origen: OrigenMaterialLunar) {}
  descripcionKey(): string {
    return 'CRITERIO_IGNEAS';
  }
  esValido(mineral: Mineral): boolean {
    return mineral.origen === this.origen &&
           mineral.dametamanoGrano() === 'GRANO_MUY_GRUESO';
  }
  dameCriterio(): OrigenMaterialLunar{
    return this.origen;
  }
}

export class CriterioMetamorficas implements ICriterioValidacion {
  constructor(public origen: OrigenMaterialLunar) {}
  descripcionKey(): string {
    return 'CRITERIO_METAMORFICAS';
  }
  esValido(mineral: Mineral): boolean {
    const grano = mineral.dametamanoGrano();
    return mineral.origen === this.origen &&
           (grano === 'GRANO_FINO' || grano === 'GRANO_MEDIO') &&
           mineral.textura === TexturaMaterialLunar.Vitrea;
  }
  dameCriterio(): OrigenMaterialLunar{
    return this.origen;
  }
}

export class CriterioSedimentarias implements ICriterioValidacion {
  constructor(public origen: OrigenMaterialLunar) {}
  descripcionKey(): string {
    return 'CRITERIO_SEDIMENTARIAS';
  }
  esValido(mineral: Mineral): boolean {
    return mineral.origen === this.origen &&
           mineral.textura === TexturaMaterialLunar.Faneritica;
  }
  dameCriterio(): OrigenMaterialLunar{
    return this.origen;
  }
}

export class CriterioFactoria {
  criterio: ICriterioValidacion;
  constructor(origen: OrigenMaterialLunar) {
    switch (origen) {
      case OrigenMaterialLunar.Igneas:
        this.criterio = new CriterioIgneas(origen);
        break;
      case OrigenMaterialLunar.Metamoficas:
        this.criterio = new CriterioMetamorficas(origen);
        break;
      case OrigenMaterialLunar.Sedimentarias:
        this.criterio = new CriterioSedimentarias(origen);
        break;
      default:
        throw new Error('ORIGEN_NO_RECONOCIDO');
    }
  }
}
