import { Injectable } from '@angular/core';
import { OrigenMaterialLunar } from '../models/enums.model';

@Injectable({ providedIn: 'root' })
export class TraduccionService {

  private readonly criterioLabels: Record<OrigenMaterialLunar, string> = {
    [OrigenMaterialLunar.Igneas]: $localize`:@@criterioIgneas:Ígneas`,
    [OrigenMaterialLunar.Metamoficas]: $localize`:@@criterioMetamorficas:Metamórficas`,
    [OrigenMaterialLunar.Sedimentarias]: $localize`:@@criterioSedimentarias:Sedimentarias`
  };
  private readonly nombresCampos: Record<string, string> = {
    id: $localize`:@@campoId:ID`,
    nombre: $localize`:@@campoNombre:Nombre`,
    origen: $localize`:@@campoOrigen:Origen`,
    clasificacion: $localize`:@@campoClasificacion:Clasificación`,
    textura: $localize`:@@campoTextura:Textura`,
    dureza: $localize`:@@campoDureza:Dureza`,
    tamanoGrano: $localize`:@@campoTamanoGrano:Tamaño de grano`,
    tamanoCristal: $localize`:@@campoTamanoCristal:Tamaño de cristal`,
    temperatura: $localize`:@@campoTemperatura:Temperatura`
  };
  private readonly mensajesErrorAstro: Record<string, string> = {
    ID_ASTRO_INVALIDO: $localize`:@@errorIdAstro:El ID debe tener el formato AGM001 (3 letras + 3 números)`,
    EDAD_INVALIDA: $localize`:@@errorEdadAstro:La edad debe estar entre 18 y 65`,
  };
  private readonly mensajesErrorMineral: Record<string, string> = {
    ID_MINERAL_INVALIDO: $localize`:@@errorIdMineral:El ID del mineral no puede estar vacío`,
    DUREZA_INVALIDA: $localize`:@@errorDurezaMineral:La dureza debe estar entre 1 y 10`,
  };
  dameCriterioLabel(origen: OrigenMaterialLunar): string {
    return this.criterioLabels[origen];
  }
  errorMessageAstro(codigos: string[]): string[] {
    return codigos.map(codigo => this.mensajesErrorAstro[codigo]).filter(Boolean);
  }
  dameNombreCampo(campo: string): string {
    return this.nombresCampos[campo] || campo;
  }
  errorNombreCampo(campo: string): string {
    return $localize`:@@errorCampoObligatorio:El campo "${campo}" es obligatorio.`;
  }
  errorMessageMineral(codigos: string[]): string[] {
    return codigos.map(codigo => this.mensajesErrorMineral[codigo]).filter(Boolean);
  }
  errorTitulo(): string {
    return $localize`:@@errorTitulo:Errores encontrados:`;
  }
}