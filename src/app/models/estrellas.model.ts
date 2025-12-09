export interface Punto {
  x: number;
  y: number;
}

export interface EntornoEstrella {
  ancho: number;
  alto: number;
}

export class Estrella {
  esMeteoro: boolean;
  x = 0;
  y = 0;
  velocidad = 0;
  longitud = 0;
  opacidad = 0;
  dx = 0;
  dy = 0;
  color = "";
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
    this.opacidad = this.esMeteoro
      ? 0.8 + Math.random() * 0.2
      : 0.3 + Math.random() * 0.5;
    this.dx = this.velocidad;
    this.dy = this.velocidad * 0.3;
    this.color = this.esMeteoro
      ? `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},255,`
      : `rgba(255,255,255,`;
    this.estela = [];
  }

  reiniciar(): void {
    if (Math.random() < 0.5) {
      this.x = Math.random() * this.entorno.ancho;
      this.y = 0;
    } else {
      this.x = this.entorno.ancho;
      this.y = Math.random() * this.entorno.alto;
    }
    this.velocidad = 2 + Math.random() * 3;
    this.longitud = 15 + Math.random() * 25;
    this.opacidad = this.esMeteoro
      ? 0.8 + Math.random() * 0.2
      : 0.3 + Math.random() * 0.5;
    this.dx = this.velocidad;
    this.dy = this.velocidad * 0.3;
    this.color = this.esMeteoro
      ? `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},255,`
      : `rgba(255,255,255,`;
    this.estela = [];
  }

  dibujar(
    pincel: CanvasRenderingContext2D,
    entorno: EntornoEstrella
  ): void {
    this.estela.push({ x: this.x, y: this.y });

    if (this.estela.length > this.longitud) this.estela.shift();

    for (let i = 0; i < this.estela.length - 1; i++) {
      const p1 = this.estela[i];
      const p2 = this.estela[i + 1];
      if (!p1 || !p2) continue;

      const alfa = (i / this.estela.length) * this.opacidad;

      pincel.beginPath();
      pincel.moveTo(p1.x, p1.y);
      pincel.lineTo(p2.x, p2.y);
      pincel.strokeStyle = `${this.color}${alfa})`;
      pincel.lineWidth = this.esMeteoro ? 3 : 2;
      pincel.stroke();
    }

    pincel.beginPath();
    pincel.arc(this.x, this.y, this.esMeteoro ? 4 : 3, 0, Math.PI * 2);
    pincel.fillStyle = `${this.color}${this.opacidad + 0.3})`;
    pincel.fill();

    this.x -= this.dx;
    this.y += this.dy;

    const primero = this.estela[0];
    if (primero && (primero.x < -50 || primero.y > entorno.alto + 50)) {
      this.reiniciar();
    }
  }
}
