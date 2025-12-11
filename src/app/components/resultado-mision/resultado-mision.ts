import { Component, ViewChild, ElementRef, inject, effect } from '@angular/core';
import { MisionService } from '../../services/mision';
import { MineralService } from '../../services/mineral';
import { SistemaSalidaAmericano, SistemaSalidaEuropeo } from '../../models/salida.model';
import { ScrollService } from '../../services/scroll';

@Component({
  selector: 'app-resultado-mision',
  templateUrl: './resultado-mision.html',
  styleUrls: ['./resultado-mision.scss'],
  standalone: true
})
export class ResultadoMisionComponent {
  public misionService = inject(MisionService);
  private mineralService = inject(MineralService);
  private scrollService = inject(ScrollService);

  @ViewChild('resultadoDiv') resultadoDiv!: ElementRef<HTMLDivElement>;

  tipo: string = "";

  mision = this.misionService.mision;   
  mineral = this.mineralService.mineral;

  constructor() {}

  seleccionarSistemaEuropa(): void {
    const salida = new SistemaSalidaEuropeo();
    this.tipo = salida.tipo;
    this.misionService.crearMision(salida);

    const m = this.mision();
    if (m?.mineral) salida.procesar(m.mineral);

    this.mineralService.resetMineral();

    setTimeout(() => {
      if (this.resultadoDiv?.nativeElement) {
        this.scrollService.scrollToElement(this.resultadoDiv.nativeElement);
      }
    });
  }

  seleccionarSistemaAmerica(): void {
    const salida = new SistemaSalidaAmericano();
    this.tipo = salida.tipo;
    this.misionService.crearMision(salida);

    const m = this.mision();
    if (m?.mineral) salida.procesar(m.mineral);

    this.mineralService.resetMineral();

    setTimeout(() => {
      if (this.resultadoDiv?.nativeElement) {
        this.scrollService.scrollToElement(this.resultadoDiv.nativeElement);
      }
    });
  }
}
