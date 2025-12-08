import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mineral } from '../models/mineral.model';

@Injectable({
  providedIn: 'root'
})
export class MineralService {
  private mineral = new BehaviorSubject<Mineral | null>(null);

  mineral$: Observable<Mineral | null> = this.mineral.asObservable();

  constructor() {}

  establecerMineral(mineral: Mineral): void {
    this.mineral.next(mineral);
  }

  obtenerMineralActual(): Mineral | null {
    return this.mineral.value;
  }

  resetMineral(): void {
    this.mineral.next(null);
  }
}
