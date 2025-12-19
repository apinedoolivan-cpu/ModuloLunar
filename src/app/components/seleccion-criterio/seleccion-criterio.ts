import { Component, inject, computed } from '@angular/core';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { ScrollService } from '../../services/scroll';
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

  criterios = [
    OrigenMaterialLunar.Igneas,
    OrigenMaterialLunar.Metamoficas,
    OrigenMaterialLunar.Sedimentarias
  ];
  criterioLabels: Record<OrigenMaterialLunar, string> = {
    [OrigenMaterialLunar.Igneas]: $localize`:@@criterioIgneas:Ígneas`,
    [OrigenMaterialLunar.Metamoficas]: $localize`:@@criterioMetamoficas:Metamórficas`,
    [OrigenMaterialLunar.Sedimentarias]: $localize`:@@criterioSedimentarias:Sedimentarias`
  };

  criterioSeleccionado: CriterioFactoria | null = null;

  mostrar = computed(() => this.misionService.astronauta() === null);

  seleccionar(criterio: OrigenMaterialLunar) {
    this.criterioSeleccionado = new CriterioFactoria(criterio);
    this.misionService.establecerCriterio(this.criterioSeleccionado.criterio);
    this.scrollService.scrollToAnchor('astronauta');
  }
}
