import { Punto, EntornoEstrella } from "./interfaces.model";

export class Estrella {
  esMeteoro: boolean;
  x = 0;
  y = 0;
  velocidad = 0;
  longitud = 0;
  opacidad = 0;
  dx = 0;
  dy = 0;
  color = '';
  estela: Punto[] = [];
  entorno: EntornoEstrella;

  constructor(entorno: EntornoEstrella) {
    this.entorno = entorno;
    this.esMeteoro = Math.random() < 0.15;
    this.iniciarPosicionAleatoria();
  }

  iniciarPosicionAleatoria(): void {
    this.x = Math.random() * this.entorno.ancho;
    this.y = Math.random() * this.entorno.alto;
    this.velocidad = 2 + Math.random() * 3;
    this.longitud = 15 + Math.random() * 25;
    this.opacidad = this.esMeteoro ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.5;

    this.dx = this.velocidad;
    this.dy = this.velocidad * 0.3;

    this.color = this.esMeteoro
      ? `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},255,`
      : `rgba(255,255,255,`;

    this.estela = [];
  }

  reiniciar(): void {
    this.iniciarPosicionAleatoria();
  }
}
