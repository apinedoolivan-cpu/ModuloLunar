import { ICriterioValidacion } from './interfaces.model';
import { Mineral } from './mineral.model';
import { OrigenMaterialLunar, TexturaMaterialLunar } from './enums.model';

export class CriterioIgneas implements ICriterioValidacion {
  constructor(public origen: OrigenMaterialLunar) {}
  descripcion(): string {
    return 'Criterio Ígneas: Origen ígneo y grano muy grueso.';
  }
  esValido(mineral: Mineral): boolean {
    return mineral.origen === this.origen &&
           mineral.dametamanoGrano() === 'Grano muy grueso';
  }
  dameCriterio(): OrigenMaterialLunar{
    return this.origen;
  }
}

export class CriterioMetamorficas implements ICriterioValidacion {
  constructor(public origen: OrigenMaterialLunar) {}
  descripcion(): string {
    return 'Criterio Metamórficas: Origen metamórfico, grano medio/fino y textura vítrea.';
  }
  esValido(mineral: Mineral): boolean {
    const grano = mineral.dametamanoGrano();
    return mineral.origen === this.origen &&
           (grano === 'Grano fino' || grano === 'Grano medio') &&
           mineral.textura === TexturaMaterialLunar.Vitrea;
  }
  dameCriterio(): OrigenMaterialLunar{
    return this.origen;
  }
}

export class CriterioSedimentarias implements ICriterioValidacion {
  constructor(public origen: OrigenMaterialLunar) {}
  descripcion(): string {
    return 'Criterio Sedimentarias: Origen sedimentario y textura fanerítica.';
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
        throw new Error('Origen de mineral no reconocido');
    }
  }
}
