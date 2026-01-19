import { Component, inject, computed } from '@angular/core';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { ScrollService } from '../../services/scroll';
import { TraduccionService } from '../../services/traduccion.service';
import { OrigenMaterialLunar } from '../../models/enums.model';
import { CriterioFactoria } from '../../models/criterios.model';

@Component({
  selector: 'app-seleccion-criterio',
  standalone: true,
  templateUrl: './seleccion-criterio.html',
  styleUrls: ['./seleccion-criterio.scss']
})
export class SeleccionCriterioComponent {

  public misionService = inject(InicioMisionService);
  private scrollService = inject(ScrollService);
  public traduccionService = inject(TraduccionService);

  criterios = [
    OrigenMaterialLunar.Igneas,
    OrigenMaterialLunar.Metamoficas,
    OrigenMaterialLunar.Sedimentarias
  ];

  criterioSeleccionado: CriterioFactoria | null = null;

  mostrar = computed(() => this.misionService.astronauta() === null);

  seleccionar(criterio: OrigenMaterialLunar) {
    this.criterioSeleccionado = new CriterioFactoria(criterio);
    this.misionService.establecerCriterio(this.criterioSeleccionado.criterio);
    this.scrollService.scrollToAnchor('astronauta');
  }
}
