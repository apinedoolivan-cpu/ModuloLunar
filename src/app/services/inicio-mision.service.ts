import { Injectable, signal, effect } from '@angular/core';
import { Astronauta } from '../models/astronauta.model';
import { ICriterioValidacion } from '../models/criterios.model';

@Injectable({
  providedIn: 'root'
})
export class InicioMisionService {

  criterio = signal<ICriterioValidacion | null>(null);
  astronauta = signal<Astronauta | null>(null);
  reiniciar = signal(false);

  establecerCriterio(criterio: ICriterioValidacion) {
    this.criterio.set(criterio);
  }

  establecerAstronauta(astronauta: Astronauta) {
    this.astronauta.set(astronauta);
  }

  reset() {
    this.criterio.set(null);
    this.astronauta.set(null);
    this.reiniciar.set(!this.reiniciar()); 
  }

  obtenerAstronauta(): Astronauta | null {
    return this.astronauta();
  }

  obtenerCriterio(): ICriterioValidacion | null {
    return this.criterio();
  }

  puedeIniciarMineral(): boolean {
    return this.astronauta() !== null && this.criterio() !== null;
  }
}
