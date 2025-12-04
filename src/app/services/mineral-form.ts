import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mineral } from '../models/mineral.model';

@Injectable({
  providedIn: 'root'
})
export class MineralService {

  private _mineral = new BehaviorSubject<Mineral | null>(null);
  mineral$ = this._mineral.asObservable();

  constructor() {}

  establecerMineral(mineral: Mineral) {
    this._mineral.next(mineral);
  }
  obtenerMineralActual(): Mineral | null {
    return this._mineral.value;
  }
  resetear() {
    this._mineral.next(null);
  }
}
