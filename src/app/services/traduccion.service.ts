import { Injectable } from '@angular/core';
import { OrigenMaterialLunar, ClasificacionMaterialLunar, TexturaMaterialLunar } from '../models/enums.model';

@Injectable({ providedIn: 'root' })
export class TraduccionService {

  private readonly origenMaterialLunarLabels: Record<OrigenMaterialLunar, string> = {
    [OrigenMaterialLunar.Igneas]: $localize`:@@criterioIgneas:Ígneas`,
    [OrigenMaterialLunar.Metamoficas]: $localize`:@@criterioMetamorficas:Metamórficas`,
    [OrigenMaterialLunar.Sedimentarias]: $localize`:@@criterioSedimentarias:Sedimentarias`
  };
  private readonly clasificacionMaterialLunarLabels: Record<ClasificacionMaterialLunar, string> = {
    [ClasificacionMaterialLunar.RocasConstruccion]: $localize`:@@clasificacionRocasConstruccion:Rocas de construcción: Son aquellas rocas que se usan para la construcción de diferentes estructuras.`,
    [ClasificacionMaterialLunar.RocaOrnamental]: $localize`:@@clasificacionRocaOrnamental:Roca ornamental: Son todas aquellas rocas de uso decorativo,integrado o no en edificio o estructuras superiores.`,
    [ClasificacionMaterialLunar.Utensilios]: $localize`:@@clasificacionUtensilios:Utensilios: Rocas de uso en utensilios para el hombre.`,
    [ClasificacionMaterialLunar.PiedraMachada]: $localize`:@@clasificacionPiedraMachada:Piedras machacadas: Áridos, ripios, agregados, etc. que son muy utilizados en la construcción como material de relleno.`
  };
  private readonly texturaMaterialLunarLabels: Record<TexturaMaterialLunar, string> = {
    [TexturaMaterialLunar.Vitrea]: $localize`:@@texturaVitrea:Vítrea`,
    [TexturaMaterialLunar.Afanitica]: $localize`:@@texturaAfanitica:Afanítica`,
    [TexturaMaterialLunar.Faneritica]: $localize`:@@texturaFaneritica:Fanerítica`,
  };
  private readonly descripcionesCriteriosLabels: Record<string, string> = {
    CRITERIO_IGNEAS: $localize`:@@criterioIgneasDescripcion:Ígneas: Criterio Ígneas: Origen ígneo y grano muy grueso.`,
    CRITERIO_METAMORFICAS: $localize`:@@criterioMetamorficasDescripcion:Criterio Metamórficas: Origen metamórfico, grano medio/fino y textura vítrea.`,
    CRITERIO_SEDIMENTARIAS: $localize`:@@criterioSedimentariasDescripcion:Criterio Sedimentarias: Origen sedimentario y textura fanerítica.`
  };
  private readonly nombresCampos: Record<string, string> = {
    CAMPO_ID: $localize`:@@campoId:ID`,
    CAMPO_NOMBRE: $localize`:@@campoNombre:Nombre`,
    CAMPO_ORIGEN: $localize`:@@campoOrigen:Origen`,
    CAMPO_CLASIFICACION: $localize`:@@campoClasificacion:Clasificación`,
    CAMPO_TEXTURA: $localize`:@@campoTextura:Textura`,
    CAMPO_DUREZA: $localize`:@@campoDureza:Dureza`,
    CAMPO_TAMANOGRANO: $localize`:@@campoTamanoGrano:Tamaño de grano`,
    CAMPO_TAMANOCRISTAL: $localize`:@@campoTamanoCristal:Tamaño de cristal`,
    CAMPO_TEMPERATURA: $localize`:@@campoTemperatura:Temperatura`
  };
  private readonly tamanosGranoLabels: Record<string, string> = {
    GRANO_MUY_GRUESO: $localize`:@@tamanoMuyGrueso:Grano muy grueso`,
    GRANO_GRUESO: $localize`:@@tamanoGrueso:Grano grueso`,
    GRANO_MEDIO: $localize`:@@tamanoMediano:Grano medio`,
    GRANO_FINO: $localize`:@@tamanoFino:Grano fino`
  };
  private readonly mensajesErrorAstro: Record<string, string> = {
    ID_ASTRO_INVALIDO: $localize`:@@errorIdAstro:El ID debe tener el formato AGM001 (3 letras + 3 números)`,
    EDAD_INVALIDA: $localize`:@@errorEdadAstro:La edad debe estar entre 18 y 65`,
  };
  private readonly mensajesErrorMineral: Record<string, string> = {
    ID_MINERAL_INVALIDO: $localize`:@@errorIdMineral:El ID debe seguir el formato LLNNNNLL (ejemplo: AB1234CD).`,
    DUREZA_INVALIDA: $localize`:@@errorDurezaMineral:La dureza debe estar entre 1 y 10.`,
    TAMANO_GRANO_INVALIDO: $localize`:@@errorTamanoGranoMineral:El tamaño de grano debe ser mayor que 0.`,
    TAMANO_CRISTAL_INVALIDO: $localize`:@@errorTamanoCristalMineral:El tamaño de cristal debe estar entre 0 y 10.`,
    TEMPERATURA_INVALIDA: $localize`:@@errorTemperaturaMineral:La temperatura debe estar entre -100 y 100 Cº.`
  };
  dameOrigenMaterialLunarLabel(origen: OrigenMaterialLunar): string {
    return this.origenMaterialLunarLabels[origen];
  }
  dameClasificacionMaterialLunarLabel(clasificacion: ClasificacionMaterialLunar): string {
    return this.clasificacionMaterialLunarLabels[clasificacion] || clasificacion;
  }
  dameTexturaMaterialLunarLabel(textura: TexturaMaterialLunar): string {
    return this.texturaMaterialLunarLabels[textura] || textura;
  }
  dameTamanoGranoLabel(tamano: string): string {
    return this.tamanosGranoLabels[tamano] || tamano;
  }
  dameNombreCampo(campo: string): string {
    return this.nombresCampos[campo] || campo;
  }
  dameDescripcionCriterioLabel(descripcionKey: string): string {
    return this.descripcionesCriteriosLabels[descripcionKey] || descripcionKey;
  }
  errorMessageAstro(codigos: string[]): string[] {
    return codigos.map(codigo => this.mensajesErrorAstro[codigo]).filter(Boolean);
  }
  errorNombreCampo(codigoCampo: string): string {
    const nombreCampo = this.dameNombreCampo(codigoCampo);
    return $localize`:@@errorCampoObligatorio:El campo "${nombreCampo}" es obligatorio.`;
  }
  errorMessageMineral(codigos: string[]): string[] {
    return codigos
      .map(codigo => {

        if (codigo.startsWith('CAMPO_')) {
          return this.errorNombreCampo(codigo);
        }

        return this.mensajesErrorMineral[codigo];
      })
      .filter(Boolean);
  }
  errorTitulo(): string {
    return $localize`:@@errorTitulo:Errores encontrados:`;
  }
}