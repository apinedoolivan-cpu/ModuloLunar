import { Component } from '@angular/core';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { OrigenMaterialLunar } from '../../models/enums.model';

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

  visible = true;

  constructor(private misionService: InicioMisionService) {}

  seleccionar(criterio: OrigenMaterialLunar) {
    this.misionService.establecerCriterio(criterio);
    this.visible = false;
  }
}
