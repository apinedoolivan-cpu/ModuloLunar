import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { TraduccionService } from '../../services/traduccion.service';

@Component({
  selector: 'app-datos-mision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-mision.html',
  styleUrls: ['./datos-mision.scss'],
})
export class DatosMisionComponent {

  private misionService = inject(InicioMisionService);
  private traduccionService = inject(TraduccionService);

  astronauta = this.misionService.astronauta;
  criterio = this.misionService.criterio;
  criterioLabel = computed(() => {
    const criterio = this.criterio();
    return criterio
      ? this.traduccionService.dameCriterioLabel(criterio.dameCriterio())
      : '';
  });
  fechaInicio = new Date();
}
