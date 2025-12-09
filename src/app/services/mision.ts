import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mision } from '../models/mision.model';
import { ISistemaSalida } from '../models/interfaces.model';
import { InicioMisionService } from './inicio-mision.service';
import { MineralService } from './mineral';

@Injectable({
  providedIn: 'root'
})
export class MisionService {

  private _mision = new BehaviorSubject<Mision | null>(null);
  public mision$ = this._mision.asObservable();

  constructor(private inicioService: InicioMisionService, private mineralService: MineralService) {
    this.mineralService.mineral$.subscribe(() => {
      this.reset();
    });
  }

  crearMision(salida: ISistemaSalida): void {

    const piloto = this.inicioService.obtenerAstronauta();
    const mineral = this.mineralService.obtenerMineralActual();
    const criterio = this.inicioService.obtenerCriterio();
    if (!piloto) {
      throw new Error("No hay piloto seleccionado para la misión");
    }
    if (!mineral) {
      throw new Error("No hay mineral seleccionado para la misión");
    }
    if (!criterio) {
      throw new Error("No hay criterio seleccionado para la misión");
    }

    const mision = new Mision(criterio, piloto, salida, mineral);
    this._mision.next(mision);
  }

  obtenerMision(): Mision | null {
    return this._mision.value;
  }

  reset(): void {
    this._mision.next(null);
  }
  resetearTodo(): void {
    this.reset();        
    this.mineralService.resetMineral();         
    this.inicioService.reset();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
