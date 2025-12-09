import { Component, signal } from '@angular/core';
import { SeleccionCriterioComponent } from './components/seleccion-criterio/seleccion-criterio';
import { Astronauta } from './models/astronauta.model';
import { FormularioAstronautaComponent } from "./components/form-astronauta/form-astronauta";
import { DatosMisionComponent } from "./components/datos-mision/datos-mision";
import { FormMineralComponent } from "./components/form-mineral/form-mineral";
import { ResultadoMisionComponent } from "./components/resultado-mision/resultado-mision";
import { FondoEstrellasComponent } from "./components/fondo-estrellas/fondo-estrellas";

@Component({
  selector: 'app-root',
  imports: [SeleccionCriterioComponent, FormularioAstronautaComponent, DatosMisionComponent, FormMineralComponent, ResultadoMisionComponent, FondoEstrellasComponent],
  templateUrl: './app.html',
  styleUrl: './estilos/app.scss'
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
