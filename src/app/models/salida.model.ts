import { Mineral } from "./mineral.model";
export interface ISistemaSalida {
  readonly tipo: 'europeo' | 'americano';
  procesar(mineral: Mineral): Mineral;
}
export class SistemaSalidaEuropeo implements ISistemaSalida {
  readonly tipo = 'europeo';

  procesar(mineral: Mineral): Mineral {
    return mineral.cloneWith({
      dureza: Number(mineral.dureza.toFixed(2)),
      temperatura: Number(mineral.temperatura.toFixed(2)),
      tamanoCristal: Number(mineral.tamanoCristal.toFixed(2))
    });
  }
}
export class SistemaSalidaAmericano implements ISistemaSalida {
  readonly tipo = 'americano';
  
    procesar(mineral: Mineral): Mineral {
    return mineral.cloneWith({
      dureza: Number(mineral.dureza.toFixed(2)),
      temperatura: Number(((mineral.temperatura * 9 / 5) + 32).toFixed(2)),
      tamanoCristal: Number((mineral.tamanoCristal / 25.4).toFixed(2))
    });
  }
}