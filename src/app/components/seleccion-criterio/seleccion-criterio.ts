import { Component } from '@angular/core';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { OrigenMaterialLunar } from '../../models/enums.model';
import { CriterioFactoria } from '../../models/criterios.model';

@Component({
  selector: 'app-seleccion-criterio',
  imports: [],
  templateUrl: './seleccion-criterio.html',
  styleUrl: './seleccion-criterio.scss',
})
export class SeleccionCriterioComponent {
  criterios = [
    OrigenMaterialLunar.Igneas,
    OrigenMaterialLunar.Metamoficas,
    OrigenMaterialLunar.Sedimentarias
  ];
  criterioSeleccionado: CriterioFactoria | null = null;
  constructor(public misionService: InicioMisionService) {}

  seleccionar(criterio: OrigenMaterialLunar) {
    this.criterioSeleccionado = new CriterioFactoria(criterio);
    this.misionService.establecerCriterio(this.criterioSeleccionado.criterio);
  }
  mostrar(): boolean {
    if(this.misionService.obtenerAstronauta()){
      return false;
    } 
    return true;
  }
}
