import { Injectable } from '@angular/core';
import { OrigenMaterialLunar } from '../models/enums.model';

@Injectable({ providedIn: 'root' })
export class TraduccionService {

  private readonly criterioLabels: Record<OrigenMaterialLunar, string> = {
    [OrigenMaterialLunar.Igneas]: $localize`:@@criterioIgneas:Ígneas`,
    [OrigenMaterialLunar.Metamoficas]: $localize`:@@criterioMetamorficas:Metamórficas`,
    [OrigenMaterialLunar.Sedimentarias]: $localize`:@@criterioSedimentarias:Sedimentarias`
  };
  private readonly mensajesErrorAstro: Record<string, string> = {
    ID_ASTRO_INVALIDO: $localize`:@@errorIdAstro:El ID debe tener el formato AGM001 (3 letras + 3 números)`,
    EDAD_INVALIDA: $localize`:@@errorEdadAstro:La edad debe estar entre 18 y 65`,
  };
  dameCriterioLabel(origen: OrigenMaterialLunar): string {
    return this.criterioLabels[origen];
  }
  errorMessageAstro(codigos: string[]): string[] {
    return codigos.map(codigo => this.mensajesErrorAstro[codigo]).filter(Boolean);
  }
  errorTitulo(): string {
    return $localize`:@@errorTitulo:Errores encontrados:`;
  }
}