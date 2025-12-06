import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Astronauta } from '../models/astronauta.model';
import { OrigenMaterialLunar } from '../models/enums.model';

@Injectable({
  providedIn: 'root'
})
export class InicioMisionService {
  private criterioSubject = new BehaviorSubject<OrigenMaterialLunar | null>(null);
  private astronautaSubject = new BehaviorSubject<Astronauta | null>(null);

  criterio$ = this.criterioSubject.asObservable();
  astronauta$ = this.astronautaSubject.asObservable();

  establecerCriterio(criterio: OrigenMaterialLunar) {
    this.criterioSubject.next(criterio);
  }
  establecerAstronauta(astronauta: Astronauta) {
    this.astronautaSubject.next(astronauta);
  }
  obtenerAstronauta(): Astronauta | null {
    return this.astronautaSubject.value;
  }
  obtenerCriterio(): OrigenMaterialLunar | null {
    return this.criterioSubject.value;
  }
  resetearCriterio(){
    this.criterioSubject.next(null);
  }
  resetearAstronauta() {
    this.astronautaSubject.next(null);
  }
  puedeIniciarMineral(): boolean {
    return this.astronautaSubject.value !== null && this.criterioSubject.value !== null;
  }
}
