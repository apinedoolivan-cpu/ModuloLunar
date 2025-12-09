import { Mineral } from "./mineral.model";
export interface ISistemaSalida {
  tipo: string;
  procesar(mineral: Mineral): void;
}
export class SistemaSalidaEuropeo implements ISistemaSalida {
  tipo: "europeo" = "europeo";

  procesar(mineral: Mineral): void {
    mineral.tamanoGrano = parseFloat(mineral.tamanoGrano.toFixed(2));
    mineral.temperatura = parseFloat(mineral.temperatura.toFixed(2));
    mineral.tamanoCristal = parseFloat(mineral.tamanoCristal.toFixed(2));
  }
    
}
export class SistemaSalidaAmericano implements ISistemaSalida {
  tipo: "americano" = "americano";

  procesar(mineral: Mineral): void {
    mineral.tamanoGrano = parseFloat(mineral.tamanoGrano.toFixed(2));
    mineral.temperatura = parseFloat(((mineral.temperatura * 9/5) + 32).toFixed(2));
    mineral.tamanoCristal = parseFloat((mineral.tamanoCristal / 25.4).toFixed(2));
  }
}