import { Component, signal } from '@angular/core';
import { SeleccionCriterioComponent } from './components/seleccion-criterio/seleccion-criterio';
import { Astronauta } from './models/astronauta.model';
import { FormularioAstronautaComponent } from "./components/form-astronauta/form-astronauta";
import { DatosMisionComponent } from "./components/datos-mision/datos-mision";
import { FormMineralComponent } from "./components/form-mineral/form-mineral";
import { MineralViewerComponent } from "./components/resultado-mineral/resultado-mineral";

@Component({
  selector: 'app-root',
  imports: [SeleccionCriterioComponent, FormularioAstronautaComponent, DatosMisionComponent, FormMineralComponent, MineralViewerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  astronautaActual: Astronauta | null = null;
  criterioSeleccionado: string = '';
  fechaInicio: Date = new Date();
  protected readonly title = signal('ModuloLunar');

  iniciarMision(astro: Astronauta, criterio: string) {
    this.astronautaActual = astro;
    this.criterioSeleccionado = criterio;
    this.fechaInicio = new Date();
  }
}
