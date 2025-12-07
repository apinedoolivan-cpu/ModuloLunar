import { Component } from '@angular/core';
import { MisionService } from '../../services/mision';
import { SistemaSalidaAmericano, SistemaSalidaEuropeo } from '../../models/salida.model';
import { Mision } from '../../models/mision.model';

@Component({
  selector: 'app-resultado-mision',
  templateUrl: './resultado-mision.html',
  styleUrls: ['./resultado-mision.scss'],
  standalone: true
})
export class ResultadoMisionComponent {

  mision: Mision | null = null;
  constructor(public misionService: MisionService) {
    this.mision = this.misionService.obtenerMision();
  }
  
  seleccionarSistemaEuropa(): void {
    const salida = new SistemaSalidaEuropeo();
    this.misionService.crearMision(salida);
    if (this.mision && this.mision.mineral) {
      salida.procesar(this.mision.mineral);
    } 
  }

  seleccionarSistemaAmerica(): void {
    const salida = new SistemaSalidaAmericano();
    this.misionService.crearMision(salida);
    if (this.mision && this.mision.mineral) {
      salida.procesar(this.mision.mineral);
    } 
  }

  resetMision(): void {
    this.misionService.reset();
  }

}
