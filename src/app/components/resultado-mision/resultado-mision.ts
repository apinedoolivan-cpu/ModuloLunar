import { Component, ViewChild, ElementRef } from '@angular/core';
import { MisionService } from '../../services/mision';
import { Mineral } from '../../models/mineral.model';
import { MineralService } from '../../services/mineral';
import { SistemaSalidaAmericano, SistemaSalidaEuropeo } from '../../models/salida.model';
import { Mision } from '../../models/mision.model';
import { ScrollService } from '../../services/scroll';

@Component({
  selector: 'app-resultado-mision',
  templateUrl: './resultado-mision.html',
  styleUrls: ['./resultado-mision.scss'],
  standalone: true
})
export class ResultadoMisionComponent {

  mision: Mision | null = null;
  mineral : Mineral | null = null; 
  tipo: String = "";
  @ViewChild('resultadoDiv') resultadoDiv!: ElementRef<HTMLDivElement>;

  constructor(public misionService: MisionService, public mineralService: MineralService, 
    public scrollService: ScrollService) {}

  ngOnInit() {
    this.misionService.mision$.subscribe(c => this.mision = c);
    this.mineralService.mineral$.subscribe(m => this.mineral = m)
  }
  
  seleccionarSistemaEuropa(): void {
    const salida = new SistemaSalidaEuropeo();
    this.tipo = salida.tipo;
    this.misionService.crearMision(salida);
    if (this.mision && this.mision.mineral) {
      salida.procesar(this.mision.mineral);
    } 
    this.mineral = null;
    setTimeout(() => {
      if (this.resultadoDiv) {
        this.scrollService.scrollToElement(this.resultadoDiv.nativeElement);
      }
    });
  }

  seleccionarSistemaAmerica(): void {
    const salida = new SistemaSalidaAmericano();
    this.tipo = salida.tipo;
    this.misionService.crearMision(salida);
    if (this.mision && this.mision.mineral) {
      salida.procesar(this.mision.mineral);
    }
    this.mineral = null;
    setTimeout(() => {
      if (this.resultadoDiv) {
        this.scrollService.scrollToElement(this.resultadoDiv.nativeElement);
      }
    });
  }
}
