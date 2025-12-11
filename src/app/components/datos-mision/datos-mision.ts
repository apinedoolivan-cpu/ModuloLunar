import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioMisionService } from '../../services/inicio-mision.service';

@Component({
  selector: 'app-datos-mision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-mision.html',
  styleUrls: ['./datos-mision.scss'],
})
export class DatosMisionComponent {

  private misionService = inject(InicioMisionService);

  astronauta = this.misionService.astronauta;
  criterio = this.misionService.criterio;
  fechaInicio = new Date();
}
