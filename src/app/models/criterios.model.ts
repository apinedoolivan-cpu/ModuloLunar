import { ICriterioValidacion } from './interfaces.model';
import { Mineral } from './mineral.model';
import { OrigenMaterialLunar, TexturaMaterialLunar } from './enums.model';

export class CriterioIgneas implements ICriterioValidacion {
  descripcion(): string {
    return 'Criterio Ígneas: Origen ígneo y grano muy grueso.';
  }
  esValido(mineral: Mineral): boolean {
    return mineral.origen === OrigenMaterialLunar.Igneas &&
           mineral.dameTamañoGrano() === 'Grano muy grueso';
  }
}

export class CriterioMetamorficas implements ICriterioValidacion {
  descripcion(): string {
    return 'Criterio Metamórficas: Origen metamórfico, grano medio/fino y textura vítrea.';
  }
  esValido(mineral: Mineral): boolean {
    const grano = mineral.dameTamañoGrano();
    return mineral.origen === OrigenMaterialLunar.Metamoficas &&
           (grano === 'Grano fino' || grano === 'Grano medio') &&
           mineral.textura === TexturaMaterialLunar.Vitrea;
  }
}

export class CriterioSedimentarias implements ICriterioValidacion {
  descripcion(): string {
    return 'Criterio Sedimentarias: Origen sedimentario y textura fanerítica.';
  }
  esValido(mineral: Mineral): boolean {
    return mineral.origen === OrigenMaterialLunar.Sedimentarias &&
           mineral.textura === TexturaMaterialLunar.Faneritica;
  }
}

export class CriterioFactoria {
  criterio: ICriterioValidacion;
  constructor(mineral: Mineral) {
    switch (mineral.origen) {
      case OrigenMaterialLunar.Igneas:
        this.criterio = new CriterioIgneas();
        break;
      case OrigenMaterialLunar.Metamoficas:
        this.criterio = new CriterioMetamorficas();
        break;
      case OrigenMaterialLunar.Sedimentarias:
        this.criterio = new CriterioSedimentarias();
        break;
      default:
        throw new Error('Origen de mineral no reconocido');
    }
  }
}
