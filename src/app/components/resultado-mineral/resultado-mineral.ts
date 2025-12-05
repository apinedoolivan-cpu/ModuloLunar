import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mineral } from '../../models/mineral.model';
import { MineralService } from '../../services/mineral';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mineral-viewer',
  templateUrl: './resultado-mineral.html'
})
export class MineralViewerComponent implements OnInit, OnDestroy {
  mineral: Mineral | null = null;
  private sub!: Subscription;

  constructor(private mineralService: MineralService) {}

  ngOnInit(): void {
    // Suscribirse al Observable del MineralService
    this.sub = this.mineralService.mineral$.subscribe(mineral => {
      this.mineral = mineral;
    });
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción para evitar memory leaks
    this.sub.unsubscribe();
  }
}
