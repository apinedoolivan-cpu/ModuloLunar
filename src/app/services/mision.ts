import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mision } from '../models/mision.model';
import { InicioMisionService } from './inicio-mision.service';
import { ISistemaSalida } from '../models/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class MisionService {

  private _mision = new BehaviorSubject<Mision | null>(null);
  public mision$ = this._mision.asObservable();

  constructor(private inicioService: InicioMisionService) {}

  crearMision(salida: ISistemaSalida): void {

    const piloto = this.inicioService.obtenerAstronauta();
    if (!piloto) {
      console.error('No se pudo crear misión: no hay piloto definido');
      return;
    }

    const mision = new Mision(piloto, salida);

    this._mision.next(mision);
  }

  obtenerMision(): Mision | null {
    return this._mision.value;
  }

  reset(): void {
    this._mision.next(null);
  }
}
