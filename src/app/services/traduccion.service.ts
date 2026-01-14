import { Injectable } from '@angular/core';
import { OrigenMaterialLunar } from '../models/enums.model';

@Injectable({ providedIn: 'root' })
export class TraduccionService {

  private readonly criterioLabels: Record<OrigenMaterialLunar, string> = {
    [OrigenMaterialLunar.Igneas]: $localize`:@@criterioIgneas:Ígneas`,
    [OrigenMaterialLunar.Metamoficas]: $localize`:@@criterioMetamorficas:Metamórficas`,
    [OrigenMaterialLunar.Sedimentarias]: $localize`:@@criterioSedimentarias:Sedimentarias`
  };

  dameCriterioLabel(origen: OrigenMaterialLunar): string {
    return this.criterioLabels[origen];
  }
}