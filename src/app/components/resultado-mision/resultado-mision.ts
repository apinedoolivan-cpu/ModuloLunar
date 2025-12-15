import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { MisionService } from '../../services/mision';
import { MineralService } from '../../services/mineral';
import { ISistemaSalida, SistemaSalidaAmericano, SistemaSalidaEuropeo } from '../../models/salida.model';
import { ScrollService } from '../../services/scroll';
export type SistemaTipo = 'europeo' | 'americano';

@Component({
  selector: 'app-resultado-mision',
  templateUrl: './resultado-mision.html',
  styleUrls: ['./resultado-mision.scss'],
  standalone: true
})

export class ResultadoMisionComponent {

  private readonly misionService = inject(MisionService);
  private readonly mineralService = inject(MineralService);
  private readonly scrollService = inject(ScrollService);
  

  @ViewChild('resultadoDiv')
  private resultadoDiv!: ElementRef<HTMLDivElement>;

  readonly mision = this.misionService.mision;
  readonly mineral = this.mineralService.mineral;

  sistemaSeleccionado?: SistemaTipo;

  seleccionarSistema(tipo: SistemaTipo): void {
    this.sistemaSeleccionado = tipo;
    const sistema: ISistemaSalida =
      tipo === 'americano'
        ? new SistemaSalidaAmericano()
        : new SistemaSalidaEuropeo();

    const misionActual = this.mision();
    if (!misionActual?.mineral) {
      return;
    }

    this.mineralService.resetMineral();
    queueMicrotask(() => {
      if (this.resultadoDiv?.nativeElement) {
        this.scrollService.scrollToElement(
          this.resultadoDiv.nativeElement
        );
      }
    });
  }

  reiniciar(): void {
    this.misionService.resetearTodo();
    this.sistemaSeleccionado = undefined;
  }
}
