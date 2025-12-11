import { Injectable, signal } from '@angular/core';
import { Mision } from '../models/mision.model';
import { ISistemaSalida } from '../models/salida.model';
import { InicioMisionService } from './inicio-mision.service';
import { MineralService } from './mineral';

@Injectable({
  providedIn: 'root'
})
export class MisionService {

  private _mision = signal<Mision | null>(null);
  public mision = this._mision;

  constructor(
    private inicioService: InicioMisionService,
    private mineralService: MineralService
  ) {}

  crearMision(salida: ISistemaSalida): void {
    const piloto = this.inicioService.obtenerAstronauta();
    const mineral = this.mineralService.obtenerMineralActual();
    const criterio = this.inicioService.obtenerCriterio();
    
    if (!piloto || !mineral || !criterio) {
      console.warn("No se puede crear misión: faltan datos");
      return;
    }

    const mision = new Mision(criterio, piloto, salida, mineral);
    this._mision.set(mision);
  }

  reset(): void {
    this._mision.set(null);
  }

  resetearTodo(): void {
    this.reset();
    this.mineralService.resetMineral();
    this.inicioService.reset();
  }
}
