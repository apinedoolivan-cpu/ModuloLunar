import { Mineral } from './mineral.model';

export interface ICapturable {
  capturar(): Mineral;
}
export interface ICriterioValidacion {
  descripcion(): string;
  esValido(mineral: Mineral): boolean;
}
export interface ISistemaEntrada {
  tipoFormulario: 'extendido' | 'reducido';
}
export interface ISistemaSalida {
  muestra(): Mineral;
}
export interface IPilotable {
  dameId(): string;
  dameNombre(): string;
  dameEdad(): number;
}
export interface IMisionable {
  analiza(): boolean;
}
export interface Punto {
  x: number;
  y: number;
}
export interface EntornoEstrella {
  ancho: number;
  alto: number;
}