import { Injectable, signal } from '@angular/core';
import { Mineral } from '../models/mineral.model';

@Injectable({
  providedIn: 'root'
})
export class MineralService {
  private mineralSignal = signal<Mineral | null>(null);
  mineral = this.mineralSignal.asReadonly();

  constructor() {}

  establecerMineral(mineral: Mineral): void {
    this.mineralSignal.set(mineral);
  }

  obtenerMineralActual(): Mineral | null {
    return this.mineralSignal();
  }

  resetMineral(): void {
    this.mineralSignal.set(null);
  }
}
