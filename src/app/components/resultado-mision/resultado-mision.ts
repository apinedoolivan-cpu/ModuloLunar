import { Component, ViewChild, ElementRef, inject, effect} from '@angular/core';
import { MisionService } from '../../services/mision';
import { MineralService } from '../../services/mineral';
import { ISistemaSalida, SistemaSalidaEuropeo, SistemaSalidaAmericano} from '../../models/salida.model';
import { ScrollService } from '../../services/scroll';
import { Mineral } from '../../models/mineral.model';
import { TraduccionService } from '../../services/traduccion.service';

type SistemaTipo = 'europeo' | 'americano';

@Component({
  selector: 'app-resultado-mision',
  templateUrl: './resultado-mision.html',
  styleUrls: ['./resultado-mision.scss'],
  standalone: true
})
export class ResultadoMisionComponent {

  public readonly misionService = inject(MisionService);
  private readonly mineralService = inject(MineralService);
  private readonly scrollService = inject(ScrollService);
  public readonly traduccionService = inject(TraduccionService);

  @ViewChild('resultadoDiv')
  resultadoDiv!: ElementRef<HTMLDivElement>;

  tipo: SistemaTipo | '' = '';

  mineral = this.mineralService.mineral;

  mision = this.misionService.mision;

  mineralSalida?: Mineral;

  seleccionarSistema(tipo: SistemaTipo): void {

    const mineralOriginal = this.mineral();
    if (!mineralOriginal) {
      return;
    }

    const salida: ISistemaSalida =
      tipo === 'americano'
        ? new SistemaSalidaAmericano()
        : new SistemaSalidaEuropeo();

    this.tipo = salida.tipo;

    this.misionService.crearMision(salida);
    
    this.mineralSalida = salida.procesar(mineralOriginal);

    this.mineralService.resetMineral();
    
    setTimeout(() => {
      if (this.resultadoDiv?.nativeElement) {
        this.scrollService.scrollToElement(this.resultadoDiv.nativeElement);
      }
    });

  }
}
