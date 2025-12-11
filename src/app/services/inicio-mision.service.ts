import { Injectable, signal, computed } from '@angular/core';
import { Astronauta } from '../models/astronauta.model';
import { ICriterioValidacion } from '../models/criterios.model';

@Injectable({
  providedIn: 'root'
})
export class InicioMisionService {

  private criterioSignal = signal<ICriterioValidacion | null>(null);
  private astronautaSignal = signal<Astronauta | null>(null);
  private reiniciarSignal = signal<number>(0);

  criterio = this.criterioSignal.asReadonly();
  astronauta = this.astronautaSignal.asReadonly();
  reiniciar = this.reiniciarSignal.asReadonly();

  establecerCriterio(criterio: ICriterioValidacion) {
    this.criterioSignal.set(criterio);
  }

  establecerAstronauta(astronauta: Astronauta) {
    this.astronautaSignal.set(astronauta);
  }

  obtenerAstronauta(): Astronauta | null {
    return this.astronautaSignal();
  }

  obtenerCriterio(): ICriterioValidacion | null {
    return this.criterioSignal();
  }

  reset() {
    this.criterioSignal.set(null);
    this.astronautaSignal.set(null);
    this.reiniciarSignal.update(v => v + 1);
  }
  puedeIniciarMineral = computed(() =>
    this.astronautaSignal() !== null &&
    this.criterioSignal() !== null
  );
}
