import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Estrella, EntornoEstrella } from '../../models/estrellas.model';

@Component({
  selector: 'app-fondo-estrellas',
  template: `<canvas id="canvas-fondo"></canvas>`,
  styleUrls: ['./fondo-estrellas.scss']
})
export class FondoEstrellasComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  lienzo!: HTMLCanvasElement;
  pincel!: CanvasRenderingContext2D;
  entorno!: EntornoEstrella;
  estrellas: Estrella[] = [];


  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    this.lienzo = document.getElementById('canvas-fondo') as HTMLCanvasElement;
    this.pincel = this.lienzo.getContext('2d') as CanvasRenderingContext2D;

    this.entorno = {
      ancho: window.innerWidth,
      alto: window.innerHeight
    };

    this.ajustarTamano();
    this.crearEstrellas();
    this.animar();
  }


  @HostListener('window:resize')
  onResize() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.ajustarTamano();
  }


  ajustarTamano() {
    this.entorno.ancho = window.innerWidth;
    this.entorno.alto = window.innerHeight;

    this.lienzo.width = this.entorno.ancho;
    this.lienzo.height = this.entorno.alto;
  }


  crearEstrellas() {
    this.estrellas = [];
    for (let i = 0; i < 150; i++) {
      this.estrellas.push(new Estrella(this.entorno));
    }
  }


  animar() {
    this.pincel.clearRect(0, 0, this.entorno.ancho, this.entorno.alto);

    this.estrellas.forEach(e => e.dibujar(this.pincel, this.entorno));

    requestAnimationFrame(() => this.animar());
  }
}
