import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { Astronauta } from '../../models/astronauta.model';
import { ICriterioValidacion } from '../../models/criterios.model';

@Component({
  selector: 'app-datos-mision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-mision.html',
  styleUrls: ['./datos-mision.scss'],
})
export class DatosMisionComponent {

  fechaInicio = new Date();

  constructor(public misionService: InicioMisionService) {}

  get astronauta(): Astronauta | null {
    return this.misionService.astronauta();
  }

  get criterio(): ICriterioValidacion | null {
    return this.misionService.criterio();
  }

}
