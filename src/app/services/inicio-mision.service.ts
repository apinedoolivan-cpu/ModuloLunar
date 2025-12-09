import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Astronauta } from '../models/astronauta.model';
import { ICriterioValidacion } from '../models/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class InicioMisionService {
  private criterioSubject = new BehaviorSubject<ICriterioValidacion | null>(null);
  private astronautaSubject = new BehaviorSubject<Astronauta | null>(null);
  private reiniciarSubject = new Subject<void>();

  criterio$ = this.criterioSubject.asObservable();
  astronauta$ = this.astronautaSubject.asObservable();
  reiniciar$ = this.reiniciarSubject.asObservable();

  establecerCriterio(criterio: ICriterioValidacion) {
    this.criterioSubject.next(criterio);
  }
  establecerAstronauta(astronauta: Astronauta) {
    this.astronautaSubject.next(astronauta);
  }
  obtenerAstronauta(): Astronauta | null {
    return this.astronautaSubject.value;
  }
  obtenerCriterio(): ICriterioValidacion | null {
    return this.criterioSubject.value;
  }
  reset(){
    this.criterioSubject.next(null);
    this.astronautaSubject.next(null);
    this.reiniciarSubject.next();
  }
  puedeIniciarMineral(): boolean {
    return this.astronautaSubject.value !== null && this.criterioSubject.value !== null;
  }
}
